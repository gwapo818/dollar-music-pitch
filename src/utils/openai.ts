import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';

const getOpenAIClient = async () => {
  const { data: apiKeyData, error: apiKeyError } = await supabase.functions.invoke('get-secret', {
    body: { name: 'OPENAI_API_KEY' }
  });
  
  const { data: orgData, error: orgError } = await supabase.functions.invoke('get-secret', {
    body: { name: 'OPENAI_ORG_ID' }
  });
  
  if (apiKeyError || !apiKeyData?.secret) {
    console.error('Error retrieving OpenAI API key:', apiKeyError);
    throw new Error("Failed to retrieve OpenAI API key");
  }

  const apiKey = apiKeyData.secret;
  const orgId = orgData?.secret;

  return new OpenAI({
    apiKey,
    organization: orgId || undefined,
    maxRetries: 3, // Add retries
    timeout: 30000, // 30 second timeout
    dangerouslyAllowBrowser: true
  });
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const polishPitch = async (pitchContent: string): Promise<string> => {
  let retries = 0;
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second

  while (retries < maxRetries) {
    try {
      console.log(`Attempt ${retries + 1} of ${maxRetries}`);
      const openai = await getOpenAIClient();
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional music industry pitch writer. Your task is to polish and enhance music pitch descriptions while maintaining their core message and keeping them concise (max 3 sentences)."
          },
          {
            role: "user",
            content: `Polish this music pitch while maintaining its core message: ${pitchContent}`
          }
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const enhancedPitch = response.choices[0].message.content;
      if (!enhancedPitch) {
        throw new Error("No response from OpenAI");
      }
      
      console.log('Successfully received enhanced pitch');
      return enhancedPitch;
    } catch (error: any) {
      console.error('Error in polishPitch attempt', retries + 1, ':', error);
      
      // Check for rate limit or quota errors
      if (error?.status === 429 || 
          error?.message?.includes("quota exceeded") ||
          error?.error?.type === "insufficient_quota") {
        
        if (retries === maxRetries - 1) {
          console.log('Max retries reached, using original content');
          return pitchContent; // Fallback to original content after max retries
        }
        
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, retries);
        console.log(`Rate limited. Waiting ${delay}ms before retry...`);
        await sleep(delay);
        retries++;
        continue;
      }
      
      // For other errors, throw immediately
      if (error?.status === 401) {
        throw new Error("Invalid OpenAI API key. Please check your configuration.");
      }
      
      throw new Error("Failed to enhance pitch. Using original content.");
    }
  }
  
  // If we've exhausted retries, return original content
  return pitchContent;
};