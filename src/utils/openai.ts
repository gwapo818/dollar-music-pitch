import OpenAI from 'openai';
import { supabase } from '@/integrations/supabase/client';

const getOpenAIClient = async () => {
  const { data: { secret: apiKey } } = await supabase.functions.invoke('get-secret', {
    body: { name: 'OPENAI_API_KEY' }
  });
  
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const polishPitch = async (pitchContent: string): Promise<string> => {
  try {
    const openai = await getOpenAIClient();
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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

    return response.choices[0].message.content || pitchContent;
  } catch (error: any) {
    // Check for quota exceeded error
    if (error?.status === 429) {
      throw new Error("OpenAI API quota exceeded. Using original pitch content.");
    }
    console.error('Error polishing pitch:', error);
    throw error;
  }
};