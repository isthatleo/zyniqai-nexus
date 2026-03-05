import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/slack/api";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { lead } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.log("LOVABLE_API_KEY not configured — skipping Slack notification");
      return new Response(JSON.stringify({ success: false, reason: "no_api_key" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (!SLACK_API_KEY) {
      console.log("SLACK_API_KEY not configured — skipping Slack notification");
      return new Response(JSON.stringify({ success: false, reason: "no_slack_key" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const score = Number(lead.score || 0).toFixed(1);
    const tier = (lead.recommended_tier || "unknown").toUpperCase();

    const message = [
      `🚨 *Elite Lead Detected*`,
      ``,
      `*Name:* ${lead.name || "Unknown"}`,
      `*Email:* ${lead.email || "N/A"}`,
      `*Company:* ${lead.company || "N/A"}`,
      `*Industry:* ${lead.industry || "N/A"}`,
      `*Revenue:* ${lead.monthly_revenue || "N/A"}`,
      `*Score:* ${score} / 5.0`,
      `*Recommended Tier:* ${tier}`,
      `*Urgency:* ${lead.urgency_score || 1}/5`,
      `*Status:* ${lead.status || "new"}`,
      ``,
      `_Captured by ZyniqAI Receptionist_`,
    ].join("\n");

    // Try to post to #enterprise-leads channel
    const response = await fetch(`${GATEWAY_URL}/chat.postMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": SLACK_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "#enterprise-leads",
        text: message,
        username: "ZyniqAI Receptionist",
        icon_emoji: ":lion:",
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Slack notification failed:", data);
      return new Response(JSON.stringify({ success: false, error: data }), {
        status: 200, // Don't fail the parent request
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Elite lead notification sent to Slack");
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("notify-elite-lead error:", e);
    return new Response(JSON.stringify({ success: false, error: e instanceof Error ? e.message : "Unknown" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
