import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Minimize2, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import logo from "@/assets/zyniq-logo-mark.png";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/zyniq-receptionist`;
const SAVE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-lead`;
const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

// Speech Recognition types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(generateSessionId);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: "", email: "", company: "" });
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (open && leadCaptured && inputRef.current) inputRef.current.focus();
  }, [open, leadCaptured]);

  useEffect(() => {
    if (open && leadCaptured && messages.length === 0) {
      const welcomeMsg = `Welcome to ZyniqAI, ${leadInfo.name.split(" ")[0]}.\n\nAre you optimizing workflows, or building AI-native infrastructure?`;
      setMessages([{ role: "assistant", content: welcomeMsg }]);
      // Only speak if voice is enabled
      if (voiceEnabled) {
        // Small delay to ensure audio context is ready
        setTimeout(() => speakText(welcomeMsg), 100);
      }
    }
  }, [open, leadCaptured, messages.length, leadInfo.name, voiceEnabled]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const speakText = async (text: string) => {
    if (!voiceEnabled) {
      console.log("Voice disabled, skipping TTS");
      return;
    }
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsSpeaking(true);
      console.log("Requesting TTS for:", text.slice(0, 50) + "...");

      const cleanText = text
        .replace(/[*_#`]/g, "")
        .replace(/\[.*?\]\(.*?\)/g, "") // Remove markdown links
        .replace(/#+\s/g, "") // Remove markdown headers
        .slice(0, 2000);

      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text: cleanText }),
      });

      if (!response.ok) {
        console.error("TTS failed:", response.status, response.statusText);
        // fallback to browser TTS
        if (window.speechSynthesis) {
          const utter = new SpeechSynthesisUtterance(cleanText);
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utter);
          utter.onend = () => setIsSpeaking(false);
        } else {
          setIsSpeaking(false);
        }
        return;
      }

      const blob = await response.blob();
      console.log("Got audio blob:", blob.type, blob.size, "bytes");
      
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      
      audio.onended = () => {
        console.log("Audio playback ended");
        setIsSpeaking(false);
        URL.revokeObjectURL(url);
      };
      
      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsSpeaking(false);
      };
      
      console.log("Starting audio playback");
      audio.play().catch(e => {
        console.error("Audio play failed:", e);
        setIsSpeaking(false);
      });
    } catch (e) {
      console.error("TTS error:", e);
      // Fallback to browser speechSynthesis if network TTS fails
      if (window.speechSynthesis) {
        const utter = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
        utter.onend = () => setIsSpeaking(false);
      } else {
        setIsSpeaking(false);
      }
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  };

  const startRecording = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported");
      alert("Speech recognition is not supported in your browser. Try Chrome, Edge, or Safari.");
      return;
    }

    // Stop any ongoing TTS
    stopSpeaking();

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onstart = () => {
      console.log("Recording started");
      setIsRecording(true);
      finalTranscript = "";
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        console.log(`Result [${i}] (${event.results[i].isFinal ? "final" : "interim"}):`, transcript);
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }
      // Show interim results in the input field
      setInput(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: Event) => {
      console.error("Speech recognition error:", event);
      const err = (event as any).error;
      if (err === "no-speech") {
        alert("No speech detected. Please try again.");
      } else if (err === "network") {
        alert("Network error during speech recognition. Check your connection and try again.");
      } else if (err === "not-allowed" || err === "service-not-allowed") {
        alert("Microphone access was denied. Please allow microphone permissions for this site.");
      } else {
        // Generic fallback
        console.warn("Speech recognition error code:", err);
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log("Recording ended. Final transcript:", finalTranscript);
      setIsRecording(false);
      // Auto-send if we have final transcript
      if (finalTranscript.trim()) {
        setInput(finalTranscript.trim());
        setTimeout(() => {
          sendMessage(finalTranscript.trim());
        }, 100);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      console.error("Error starting recording:", e);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name.trim() || !leadInfo.email.trim()) return;
    
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
            source: "chat_widget",
            session_id: sessionId,
          },
          session_id: sessionId,
        }),
      });
    } catch (e) {
      console.error("Lead save error:", e);
    }
    setLeadCaptured(true);
  };

  const stripLeadData = (text: string): string => {
    return text.replace(/<lead_data>[\s\S]*?<\/lead_data>/g, '').trim();
  };

  const extractLeadData = (text: string) => {
    const match = text.match(/<lead_data>(.*?)<\/lead_data>/s);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;
    
    stopSpeaking();
    if (isRecording) stopRecording();

    const userMsg: Msg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantResponse = "";
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
          lead_info: leadCaptured ? {
            name: leadInfo.name,
            email: leadInfo.email,
            company: leadInfo.company,
          } : null,
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Stream failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
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
          try {
            const data = JSON.parse(jsonStr);
            if (data.choices?.[0]?.delta?.content) {
              assistantResponse += data.choices[0].delta.content;
              // Update messages in real-time
              setMessages(prev => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg && lastMsg.role === "assistant") {
                  lastMsg.content = assistantResponse;
                } else {
                  updated.push({ role: "assistant", content: assistantResponse });
                }
                return updated;
              });
            }
          } catch (e) {
            console.error("Parse error:", e);
          }
        }
      }

      // Final message update
      if (assistantResponse) {
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.role === "assistant") {
            lastMsg.content = assistantResponse;
          } else {
            updated.push({ role: "assistant", content: assistantResponse });
          }
          return updated;
        });

        // Speak the response if voice is enabled
        if (voiceEnabled) {
          await speakText(stripLeadData(assistantResponse));
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = "Sorry, I encountered an error. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: errorMsg }]);
      if (voiceEnabled) await speakText(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 lg:bottom-24 lg:right-6 w-full sm:w-[360px] md:w-[400px] h-screen sm:h-[600px] md:h-[650px] sm:max-h-[90vh] rounded-none sm:rounded-2xl shadow-2xl sm:shadow-xl overflow-hidden flex flex-col bg-card border-0 sm:border border-border/30 z-50"
          >
            {/* Header */}
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border/30 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <img src={logo} alt="" className="w-5 sm:w-6 h-5 sm:h-6 rounded-full object-contain flex-shrink-0" />
                <h3 className="text-xs sm:text-sm font-semibold truncate">ZyniqAI Receptionist</h3>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {voiceEnabled && (
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-muted/40 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                    title="Toggle voice output"
                  >
                    {voiceEnabled ? <Volume2 size={16} className="sm:hidden" /> : <VolumeX size={16} className="sm:hidden" />}
                    {voiceEnabled ? <Volume2 size={14} className="hidden sm:block" /> : <VolumeX size={14} className="hidden sm:block" />}
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-muted/40 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                  title="Close"
                >
                  <X size={16} className="sm:hidden" />
                  <X size={14} className="hidden sm:block" />
                </button>
              </div>
            </div>

            {/* Lead Form or Chat */}
            {!leadCaptured ? (
              <form onSubmit={handleLeadSubmit} className="flex flex-col justify-center items-center h-full px-4 sm:px-6 gap-3 sm:gap-4 py-6 sm:py-0">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2">Let's Connect</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">We'd love to learn about your AI needs</p>
                </div>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={leadInfo.name}
                  onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-xl bg-muted/40 border border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  required
                />

                <input
                  type="email"
                  placeholder="your@email.com"
                  value={leadInfo.email}
                  onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-xl bg-muted/40 border border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                  required
                />

                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={leadInfo.company}
                  onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                  className="w-full px-3 sm:px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-xl bg-muted/40 border border-border/40 text-xs sm:text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all"
                />

                <button
                  type="submit"
                  className="w-full px-4 py-3 sm:py-2.5 rounded-lg sm:rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all mt-2 sm:mt-4"
                >
                  Start Conversation
                </button>
              </form>
            ) : (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-2.5 sm:space-y-3 w-full">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`flex gap-2 sm:gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <img
                          src={logo}
                          alt=""
                          className="w-5 sm:w-6 h-5 sm:h-6 rounded-full object-contain flex-shrink-0 mt-0.5"
                        />
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-lg sm:rounded-2xl text-[12px] sm:text-[13px] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted/50 text-foreground rounded-bl-none border border-border/30"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>p+p]:mt-1 [&>ul]:my-1 [&>ol]:my-1 [&_li]:text-[12px] sm:[&_li]:text-[13px]">
                            <ReactMarkdown>{stripLeadData(msg.content)}</ReactMarkdown>
                          </div>
                        ) : (
                          msg.content.split("\n").map((line, j) => (
                            <span key={j}>
                              {line}
                              {j < msg.content.split("\n").length - 1 && <br />}
                            </span>
                          ))
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <User size={10} className="sm:hidden text-muted-foreground" />
                          <User size={12} className="hidden sm:block text-muted-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-2.5">
                      <img src={logo} alt="" className="w-6 h-6 rounded-full object-contain flex-shrink-0" />
                      <div className="bg-muted/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Voice indicator */}
                {isSpeaking && (
                  <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-primary/5 border-t border-primary/10 flex items-center justify-center gap-2 shrink-0">
                    <div className="flex items-center gap-0.5">
                      {[0, 1, 2, 3, 4].map(i => (
                        <motion.div
                          key={i}
                          className="w-0.5 bg-primary rounded-full"
                          animate={{ height: [4, 12, 4] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-[10px] text-primary font-medium">Speaking</span>
                    <button
                      onClick={stopSpeaking}
                      className="text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground ml-1"
                    >
                      Skip
                    </button>
                  </div>
                )}

                {/* Input */}
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-border/30 bg-card/30 shrink-0 space-y-2">
                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-red-500/10 border border-red-500/20 flex items-center justify-center gap-2 rounded-lg">
                      <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map(i => (
                          <motion.div
                            key={i}
                            className="w-0.5 bg-red-500 rounded-full"
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-red-500 font-medium">Listening...</span>
                      <button
                        onClick={stopRecording}
                        className="text-[9px] sm:text-[10px] text-muted-foreground hover:text-foreground ml-1"
                      >
                        Stop
                      </button>
                    </div>
                  )}
                  <div className="flex items-end gap-2">
                    {/* Microphone button */}
                    {speechSupported ? (
                      <button
                        onClick={toggleRecording}
                        disabled={isLoading}
                        className={`w-10 h-10 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                          isRecording
                            ? "bg-red-500 text-white animate-pulse"
                            : "bg-muted/40 text-muted-foreground hover:text-foreground border border-border/40 hover:bg-muted/60"
                        }`}
                        title={isRecording ? "Stop recording" : "Start voice input"}
                      >
                        {isRecording ? <MicOff size={16} className="sm:hidden" /> : <Mic size={16} className="sm:hidden" />}
                        {isRecording ? <MicOff size={14} className="hidden sm:block" /> : <Mic size={14} className="hidden sm:block" />}
                      </button>
                    ) : null}
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        isRecording ? "Listening..." : "Describe your operational challenge..."
                      }
                      rows={1}
                      disabled={isLoading || isRecording}
                      className="flex-1 resize-none px-3 sm:px-3.5 py-3 sm:py-2.5 rounded-lg sm:rounded-xl bg-muted/40 border border-border/40 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-all max-h-24 min-h-[40px] sm:min-h-auto"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isLoading || isRecording}
                      className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-30 flex-shrink-0"
                      title="Send message"
                    >
                      <Send size={16} className="sm:hidden" />
                      <Send size={14} className="hidden sm:block" />
                    </button>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground/50 text-center mt-2">
                    {!speechSupported
                      ? "Powered by ZyniqAI Intelligence · Voice by ElevenLabs"
                      : voiceEnabled
                      ? "🎤 Click mic to speak · 🔊 AI speaks back"
                      : "Click mic to speak · Voice output muted"}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
        title="Chat with ZyniqAI"
      >
        <MessageCircle size={24} className="sm:hidden" />
        <MessageCircle size={28} className="hidden sm:block" />
      </motion.button>
    </>
  );
};

export default AIChatWidget;
