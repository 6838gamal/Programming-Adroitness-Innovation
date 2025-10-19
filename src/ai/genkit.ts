import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {config} from 'dotenv';

// Configure dotenv at the earliest possible moment
config();

export const ai = genkit({
  plugins: [
    googleAI({
      // Explicitly pass the API key from the environment
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
