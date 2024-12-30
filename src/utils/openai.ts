import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const polishPitch = async (pitchContent: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
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
  } catch (error) {
    console.error('Error polishing pitch:', error);
    return pitchContent;
  }
};