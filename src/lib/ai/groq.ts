import Groq from 'groq-sdk';

const groq = process.env.GROQ_API_KEY 
  ? new Groq({ apiKey: process.env.GROQ_API_KEY })
  : null;

export interface TrustAnalysisResult {
  claim: string;
  trustScore: number; // 0-100
  verdict: 'Likely True' | 'Uncertain' | 'Likely False';
  sourceCredibility: string;
  supportingEvidence: string[];
  contradictions: string[];
  missingContext: string;
}

export async function analyzeTrust(inputText: string): Promise<TrustAnalysisResult> {
  if (!groq) {
    throw new Error('Groq API Key not configured');
  }

  const prompt = `
You are an expert fact-checker and information evaluator. Analyze the following text/claim.
Provide a JSON response with the exact strict following schema:
{
  "claim": "Extract the primary claim being made in ONE clear sentence",
  "trustScore": <number between 0 and 100 based on likelihood of being true/factual>,
  "verdict": <Exactly one of: "Likely True", "Uncertain", "Likely False">,
  "sourceCredibility": "Brief assessment of implicit or explicit source credibility (1-2 sentences max)",
  "supportingEvidence": ["evidence 1", "evidence 2"],
  "contradictions": ["known contradiction 1", "known contradiction 2"],
  "missingContext": "What important context is omitted that might change the interpretation?"
}

Text to analyze:
"""
${inputText}
"""
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a precise, objective analytical engine. Output ONLY valid JSON, no markdown formatting."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.1,
    top_p: 1,
    response_format: { type: "json_object" }
  });

  const responseContent = completion.choices[0]?.message?.content;
  if (!responseContent) {
    throw new Error('No response from AI');
  }

  try {
    const result = JSON.parse(responseContent) as TrustAnalysisResult;
    return result;
  } catch (error) {
    throw new Error('Failed to parse AI response into valid JSON');
  }
}
