import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export async function generateItinerary({ destination, budget, startDate, endDate, interests, travelStyle }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please add it to your .env file.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are a Master Itinerary Planner and a world-class travel expert.
Your goal is to craft the ultimate, highly personalized travel itinerary based EXACTLY on the user's specific preferences, constraints, and budget. 

TRIP DETAILS:
- Destination: ${destination}
- Strict Budget: ${budget} (Do NOT exceed this under any circumstances. Suggest affordable alternatives if necessary)
- Dates: ${startDate} to ${endDate}
- Specific Interests & Vibe: ${interests}
- Travel Style: ${travelStyle}

INSTRUCTIONS:
1. Act as a local expert for ${destination}. Suggest a mix of must-see attractions and hidden gems that align perfectly with "${interests}".
2. Ensure the pacing is realistic. Factor in travel time between locations.
3. Be strictly budget-aware. "estimatedCost" for activities must align with the overall "${budget}".
4. Because the travel style is "${travelStyle}", tailor the safety tips, transport recommendations, and accommodation areas specifically for this profile.
5. Provide actionable, specific safety notes for every single activity (e.g., "Well-lit area at night", "Use certified cabs only here", "Beware of pickpockets near the entrance").

Return ONLY valid JSON (no markdown, no code fences, no introductory text) structured EXACTLY as follows:
{
  "destination": "...",
  "totalDays": N,
  "estimatedBudget": "...",
  "safetyTips": ["tip1", "tip2", "tip3"],
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "...",
      "activities": [
        {
          "time": "09:00",
          "title": "...",
          "description": "...",
          "location": "...",
          "estimatedCost": "...",
          "safetyNote": "..."
        }
      ]
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  // Strip possible markdown fences
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}
