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
    if (lead_data && lead_data.industry) {
      const { data: existingLead } = await supabase
        .from("leads")
        .select("id")
        .eq("email", lead_data.email || "")
        .maybeSingle();

      if (existingLead) {
        await supabase.from("leads").update({
          ...lead_data,
          updated_at: new Date().toISOString(),
        }).eq("id", existingLead.id);
      } else if (lead_data.email) {
        await supabase.from("leads").insert(lead_data);
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
