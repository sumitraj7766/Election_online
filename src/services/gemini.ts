import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getElectionAdvice(question: string, history: { role: 'user' | 'model', content: string }[]) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `You are CivicPulse, an expert advisor on democratic election processes. 
Your goal is to help users understand how elections work, timelines, registration steps, and common terminology. 
Always remain neutral and non-partisan. 
If the user asks about a specific country, provide information relevant to that country if known, otherwise speak generally about democratic processes. 
Focus on:
- Voter registration steps
- Election timelines (primaries vs general)
- Voting methods (absentee, mail-in, in-person)
- Rights and accessibility at polling places
- How to verify information using official government sources.

Keep responses concise, formatted in clear Markdown, and encourage the user to double-check with their official local election office.`;

  const chatHistory = history.map(h => ({
    role: h.role === 'user' ? 'user' : 'model',
    parts: [{ text: h.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: question }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently unavailable. Please try again later.";
  }
}
