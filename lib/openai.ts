import OpenAI from 'openai';

// Initialize the OpenAI client with the API key from environment variables
export const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
}); 