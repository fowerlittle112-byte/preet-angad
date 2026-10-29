import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const callGeminiWithRetry = async (
  fn: () => Promise<GenerateContentResponse>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<GenerateContentResponse> => {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      // Check if it's a 429 error
      const isQuotaExceeded = error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED';
      
      if (isQuotaExceeded && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`Gemini API quota exceeded. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

export const generateAcademicResponse = async (prompt: string, context?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  try {
    const response = await callGeminiWithRetry(() => 
      ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are EduSmart AI, a helpful academic assistant for CBSE students (Class 6-12).
        Context: ${context || "General academic query"}
        Instructions:
        - Provide clear, exam-ready answers.
        - Use simple language for beginners.
        - Provide structured answers (intro, points, conclusion) for exams.
        - Adjust difficulty based on the student's class if known.
        - Support both Hindi and English.
        - Suggest related questions or topics at the end.
        - If asked to solve a math problem, provide step-by-step explanations.
        - Avoid unnecessary complexity.
        
        Question: ${prompt}`,
      })
    );

    return response.text;
  } catch (error) {
    console.error("Gemini API Error (Academic Response):", error);
    throw error;
  }
};

export const generateQuizQuestions = async (subject: string, chapter: string, classLevel: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  try {
    const response = await callGeminiWithRetry(() => 
      ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        config: {
          responseMimeType: "application/json",
        },
        contents: `Generate 5 multiple-choice questions for Class ${classLevel} ${subject}, Chapter: ${chapter}.
        Return the response in the following JSON format:
        [
          {
            "question": "string",
            "options": ["string", "string", "string", "string"],
            "correctAnswer": number (0-3),
            "explanation": "string"
          }
        ]`,
      })
    );

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini API Error (Quiz Generation):", error);
    throw error;
  }
};


