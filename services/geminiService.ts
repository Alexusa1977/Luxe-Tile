import { GoogleGenAI } from "@google/genai";

export const getMaterialAdvice = async (query: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        systemInstruction: "You are an expert flooring and tile consultant for a high-end renovation company. Provide concise, professional advice on tile selection, durability, and aesthetics. Keep answers under 150 words.",
      },
    });
    return response.text || "I apologize, I couldn't generate advice at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, our design assistant is currently unavailable.";
  }
};