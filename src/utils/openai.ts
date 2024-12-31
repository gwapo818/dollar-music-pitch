import { supabase } from '@/integrations/supabase/client';

export const polishPitch = async (pitchContent: string, isRegeneration: boolean = false): Promise<string> => {
  try {
    console.log(`Sending pitch for ${isRegeneration ? 'regeneration' : 'enhancement'}:`, pitchContent);
    
    const { data, error } = await supabase.functions.invoke('polish-pitch', {
      body: { 
        pitch: pitchContent,
        isRegeneration
      }
    });

    if (error) {
      console.error('Error from edge function:', error);
      throw error;
    }

    if (data.error) {
      console.error('Error from OpenAI:', data.error);
      if (data.type === "quota_exceeded") {
        throw new Error("quota exceeded");
      }
      throw new Error(data.error);
    }

    return data.enhancedPitch;
  } catch (error) {
    console.error('Error in polishPitch:', error);
    throw error;
  }
};