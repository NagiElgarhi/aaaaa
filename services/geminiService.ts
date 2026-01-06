
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAssistantResponse = async (prompt: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are an expert AI guide. The user is currently viewing a specific Google AI Studio application (a Drive applet). 
        Help them understand what Google AI Studio is, how to use it, and answer general questions about AI development. 
        Keep your tone professional, helpful, and concise. 
        If they ask about the specific link they provided, explain that Google AI Studio allows users to build and share prompt-based apps.`,
        temperature: 0.7,
      }
    });

    const response = await chat;
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to the AI service. Please check your network or try again later.";
  }
};
