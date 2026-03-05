import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { lead_data, session_id, messages } = await req.json();

    // Save lead if data provided
    if (lead_data && (lead_data.email || lead_data.industry)) {
      if (lead_data.email) {
        const { data: existingLead } = await supabase
          .from("leads")
          .select("id")
          .eq("email", lead_data.email)
          .maybeSingle();

        if (existingLead) {
          await supabase.from("leads").update({
            ...lead_data,
            updated_at: new Date().toISOString(),
          }).eq("id", existingLead.id);
        } else {
          const { data: newLead } = await supabase.from("leads").insert({
            name: lead_data.name || "Unknown",
            email: lead_data.email,
            company: lead_data.company || null,
            industry: lead_data.industry || null,
            monthly_revenue: lead_data.monthly_revenue || null,
            team_size: lead_data.team_size || null,
            ops_complexity_score: lead_data.ops_complexity_score || 1,
            ai_maturity_score: lead_data.ai_maturity_score || 1,
            urgency_score: lead_data.urgency_score || 1,
            budget_signal: lead_data.budget_signal || "low",
            multi_department: lead_data.multi_department || false,
            data_volume: lead_data.data_volume || false,
            score: lead_data.score || 0,
            recommended_tier: lead_data.recommended_tier || "core",
            status: lead_data.status || "new",
            tags: lead_data.tags || [],
          }).select("id").single();

          // If Elite lead (score >= 4.3), trigger Slack notification
          if (lead_data.score && Number(lead_data.score) >= 4.3) {
            try {
              const notifyUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/notify-elite-lead`;
              await fetch(notifyUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
                },
                body: JSON.stringify({ lead: { ...lead_data, id: newLead?.id } }),
              });
            } catch (notifyErr) {
              console.error("Slack notification failed (non-blocking):", notifyErr);
            }
          }
        }
      }
    }

    // Save conversation messages
    if (messages && session_id) {
      const rows = messages.map((m: any) => ({
        session_id,
        role: m.role,
        content: m.content,
      }));
      await supabase.from("conversations").insert(rows);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("save-lead error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
