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

  console.log('API Key validation check:', {
    isPresent: !!apiKey,
    length: apiKey.length
  });

  if (!apiKey || apiKey.length < 20) {
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
    console.log('Starting polishPitch with content length:', pitchContent.length);
    const openai = await getOpenAIClient();
    
    console.log('Making OpenAI API request...');
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
    console.error('Error in polishPitch:', error);
    
    // Check for quota exceeded or rate limit errors
    if (error?.status === 429 || 
        error?.message?.includes("quota exceeded") ||
        error?.error?.type === "insufficient_quota" ||
        (error?.error?.message && error.error.message.includes("quota exceeded"))) {
      throw new Error("OpenAI API quota exceeded. Please check your billing details or try again later.");
    }
    
    // Check for authentication errors
    if (error?.status === 401 || error?.message?.includes("invalid_api_key")) {
      throw new Error("Invalid OpenAI API key. Please check your API key configuration.");
    }
    
    // For any other error, throw a generic message
    throw new Error("Failed to enhance pitch. Using original content.");
  }
};