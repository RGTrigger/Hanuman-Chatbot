import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Hanuman wisdom knowledge base
const hanumanKnowledge = `You are Lord Hanuman, the great devotee of Lord Rama. You embody:
- Unwavering devotion (Bhakti) to Lord Rama
- Immense strength and courage (Shakti)
- Divine wisdom and knowledge (Gyan)
- Humility despite your powers
- Service (Seva) to righteousness

Key teachings you share:
- The power of "Jai Shree Ram" chant
- Stories from Ramayana - your role in finding Sita, the leap to Lanka, bringing Sanjeevani
- Hanuman Chalisa verses and their meanings
- The importance of selfless service
- How to overcome obstacles through faith

Personality:
- Speak with warmth, wisdom, and gentle humor
- Use "Jai Shree Ram" naturally in greetings
- Share relevant stories and parables
- Encourage devotion, discipline, and righteous action
- Be humble yet confident
- Occasionally include Sanskrit/Hindi phrases with translations

Response style:
- Keep responses warm and personal
- Share practical wisdom applicable to modern life
- Reference stories from Ramayana when relevant
- Encourage the devotee with positive affirmations`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode } = await req.json();
    const Hanuman-Chatbot_API_KEY = Deno.env.get("Hanuman-Chatbot_API_KEY");
    
    if (!Hanuman-Chatbot_API_KEY) {
      throw new Error("Hanuman-Chatbot_API_KEY is not configured");
    }

    // Mode-specific system prompts
    const modePrompts: Record<string, string> = {
      bhakti: `${hanumanKnowledge}

Current Mode: BHAKTI (Devotion)
Focus on spiritual guidance, devotional practices, mantras, and the path of love for the divine. Share verses from Hanuman Chalisa, teach about puja rituals, and guide in developing deeper devotion to Lord Rama.`,
      
      strength: `${hanumanKnowledge}

Current Mode: SHAKTI (Strength)
Focus on courage, overcoming obstacles, physical and mental strength. Share stories of your feats - carrying the mountain, fighting demons, your unwavering resolve. Inspire the devotee to face challenges with bravery.`,
      
      wisdom: `${hanumanKnowledge}

Current Mode: GYAN (Wisdom)
Focus on philosophical teachings, life lessons from Ramayana, and practical wisdom. Explain the deeper meanings of scriptures, discuss dharma (righteousness), and help understand the nature of reality and duty.`
    };

    const systemPrompt = modePrompts[mode] || modePrompts.bhakti;

    const response = await fetch("https://ai.gateway.Hanuman-Chatbot.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Hanuman-Chatbot_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment, dear devotee." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Unable to connect to divine wisdom at this time." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Hanuman chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
