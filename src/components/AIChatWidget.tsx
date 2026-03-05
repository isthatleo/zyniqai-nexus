import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Minimize2, Mic, MicOff, Volume2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/zyniq-logo-mark.png";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zyniq-receptionist`;
const SAVE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-lead`;

const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", company: "" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && leadCaptured && inputRef.current) inputRef.current.focus();
  }, [open, leadCaptured]);

  // Send opening message after lead capture
  useEffect(() => {
    if (open && leadCaptured && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: `Welcome to ZyniqAI, ${leadInfo.name.split(" ")[0]}.\n\nAre you optimizing workflows, or building AI-native infrastructure?`
      }]);
    }
  }, [open, leadCaptured, messages.length, leadInfo.name]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name.trim() || !leadInfo.email.trim()) return;

    // Save lead immediately
    try {
      await fetch(SAVE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          lead_data: {
            name: leadInfo.name,
            email: leadInfo.email,
            company: leadInfo.company || null,
            status: "new",
          },
          session_id: sessionId,
        }),
      });
    } catch (e) {
      console.error("Lead save error:", e);
    }

    setLeadCaptured(true);
  };

  const extractLeadData = (text: string) => {
    const match = text.match(/<lead_data>(.*?)<\/lead_data>/s);
    if (match) {
      try { return JSON.parse(match[1]); } catch { return null; }
    }
    return null;
  };

  const cleanMessage = (text: string) => text.replace(/<lead_data>.*?<\/lead_data>/gs, "").trim();

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          session_id: sessionId,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              const cleaned = cleanMessage(assistantSoFar);
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: cleaned } : m);
                }
                return [...prev, { role: "assistant", content: cleaned }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Extract and save lead data with enrichment
      const leadData = extractLeadData(assistantSoFar);
      if (leadData) {
        fetch(SAVE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            lead_data: {
              ...leadData,
              name: leadInfo.name,
              email: leadInfo.email,
              company: leadInfo.company || leadData.company || null,
            },
            session_id: sessionId,
            messages: [userMsg, { role: "assistant", content: cleanMessage(assistantSoFar) }],
          }),
        }).catch(console.error);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", content: "Connection interrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="Open AI Assistant"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl border border-border/50 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/50">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="ZyniqAI" className="w-8 h-8 rounded-full object-contain" />
                <div>
                  <p className="text-sm font-semibold">ZyniqAI Reception</p>
                  <p className="text-[10px] text-muted-foreground">AI Infrastructure Gatekeeper</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
                  <Minimize2 size={14} />
                </button>
                <button onClick={() => { setOpen(false); setMessages([]); setLeadCaptured(false); setLeadInfo({ name: "", email: "", company: "" }); }} className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Lead Capture Form */}
            {!leadCaptured ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                <img src={logo} alt="ZyniqAI" className="w-16 h-16 rounded-xl object-contain mb-4 opacity-80" />
                <h3 className="text-base font-bold mb-1">Welcome to ZyniqAI</h3>
                <p className="text-xs text-muted-foreground text-center mb-6 max-w-[260px]">
                  Before we connect you with our AI consultant, we need a few details.
                </p>
                <form onSubmit={handleLeadSubmit} className="w-full space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo(p => ({ ...p, name: e.target.value }))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo(p => ({ ...p, email: e.target.value }))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={leadInfo.company}
                    onChange={(e) => setLeadInfo(p => ({ ...p, company: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all"
                  >
                    Start Conversation
                  </button>
                </form>
                <p className="text-[9px] text-muted-foreground/40 mt-4">Your data is secure. We never share your information.</p>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <img src={logo} alt="" className="w-6 h-6 rounded-full object-contain flex-shrink-0 mt-0.5" />
                      )}
                      <div
                        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-md"
                            : "bg-muted/50 text-foreground rounded-bl-md border border-border/30"
                        }`}
                      >
                        {msg.content.split("\n").map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < msg.content.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User size={12} className="text-muted-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-2.5">
                      <img src={logo} alt="" className="w-6 h-6 rounded-full object-contain flex-shrink-0" />
                      <div className="bg-muted/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-border/30 bg-card/30">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe your operational challenge..."
                      rows={1}
                      className="flex-1 resize-none px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all max-h-24"
                      disabled={isLoading}
                    />
                    <button
                      onClick={send}
                      disabled={!input.trim() || isLoading}
                      className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-30 flex-shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                  <p className="text-[9px] text-muted-foreground/50 text-center mt-2">Powered by ZyniqAI Intelligence</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
