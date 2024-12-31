import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SPOTIFY_CHAR_LIMIT = 500;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pitch, isRegeneration } = await req.json();
    console.log(`Processing ${isRegeneration ? 'regeneration' : 'initial'} pitch:`, pitch);

    let attempts = 0;
    const maxAttempts = 3;
    const baseDelay = 1000; // Start with 1 second delay

    while (attempts < maxAttempts) {
      try {
        console.log(`Attempt ${attempts + 1} of ${maxAttempts}`);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: isRegeneration 
                  ? `You are a creative music industry professional. Generate a completely new version of this pitch while maintaining the same key information but with different wording and structure. The pitch must be exactly ${SPOTIFY_CHAR_LIMIT} characters or less.`
                  : `You are a professional music industry pitch writer. Your task is to polish and enhance music pitch descriptions while maintaining their core message. The pitch must be exactly ${SPOTIFY_CHAR_LIMIT} characters or less.`
              },
              {
                role: 'user',
                content: `${isRegeneration ? 'Create a new version of this pitch:' : 'Polish this music pitch while maintaining its core message:'} ${pitch}`
              }
            ],
            temperature: isRegeneration ? 0.9 : 0.7,
            max_tokens: 200,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('OpenAI API error:', errorData);
          
          if (response.status === 429) {
            // If we've used all our retries, throw the error
            if (attempts === maxAttempts - 1) {
              throw new Error("quota exceeded");
            }
            
            // Otherwise, wait and retry
            const delay = baseDelay * Math.pow(2, attempts);
            console.log(`Rate limited. Waiting ${delay}ms before retry...`);
            await sleep(delay);
            attempts++;
            continue;
          }
          
          throw new Error(errorData.error?.message || 'OpenAI API error');
        }

        const data = await response.json();
        const enhancedPitch = data.choices[0].message.content;
        console.log('Successfully enhanced pitch');
        
        return new Response(JSON.stringify({ enhancedPitch }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error) {
        if (error.message === "quota exceeded" || attempts === maxAttempts - 1) {
          throw error;
        }
        attempts++;
        const delay = baseDelay * Math.pow(2, attempts);
        await sleep(delay);
      }
    }
    
    throw new Error("Maximum retry attempts reached");
  } catch (error) {
    console.error('Error in polish-pitch function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        type: error.message.includes("quota") ? "quota_exceeded" : "general_error"
      }),
      {
        status: error.message.includes("quota") ? 429 : 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});