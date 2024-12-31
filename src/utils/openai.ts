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
    throw new Error("Failed to retrieve OpenAI API key. Please check your configuration.");
  }

  const apiKey = apiKeyData.secret;
  const orgId = orgData?.secret;

  // Basic validation of API key format
  if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
    throw new Error("Invalid OpenAI API key format. Please check your API key.");
  }

  return new OpenAI({
    apiKey,
    organization: orgId || undefined,
    dangerouslyAllowBrowser: true
  });
};

export const polishPitch = async (pitchContent: string): Promise<string> => {
  try {
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
    
    return enhancedPitch;
  } catch (error: any) {
    console.error('Error in polishPitch:', error);
    
    // Check for authentication errors
    if (error?.status === 401 || (error?.message && error.message.includes("invalid_api_key"))) {
      throw new Error("Invalid OpenAI API key. Please check your API key configuration.");
    }
    
    // Check for quota exceeded error
    if (error?.status === 429 || (error?.message && error.message.includes("quota exceeded"))) {
      throw new Error("OpenAI API quota exceeded. Using original pitch content.");
    }
    
    // For any other error, throw it to be handled by the component
    throw error;
  }
};