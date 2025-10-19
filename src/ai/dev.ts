'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/ai-smart-assistant.ts';
import '@/ai/flows/ai-course-recommendations.ts';
import '@/ai/flows/ai-guidance-assistant.ts';
import '@/ai/flows/speech-to-text.ts';
import '@/ai/flows/text-to-speech.ts';
