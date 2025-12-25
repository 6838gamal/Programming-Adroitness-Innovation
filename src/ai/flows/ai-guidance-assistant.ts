'use server';
/**
 * @fileOverview This file defines the AI Guidance Assistant flow for providing career and learning path advice.
 *
 * - aiGuidanceAssistant - The main function to interact with the AI Guidance Assistant.
 * - AIGuidanceAssistantInput - The input type for the aiGuidanceAssistant function.
 * - AIGuidanceAssistantOutput - The output type for the aiGuidanceAssistant function.
 */

import {ai} from '@/ai';
import {z} from 'genkit';

const AIGuidanceAssistantInputSchema = z.object({
  query: z.string().describe('The user query or request for guidance.'),
  studentId: z.string().describe('The unique identifier for the student.'),
});
export type AIGuidanceAssistantInput = z.infer<
  typeof AIGuidanceAssistantInputSchema
>;

const AIGuidanceAssistantOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI Assistant response to the user query.'),
});
export type AIGuidanceAssistantOutput = z.infer<
  typeof AIGuidanceAssistantOutputSchema
>;

export async function aiGuidanceAssistant(
  input: AIGuidanceAssistantInput
): Promise<AIGuidanceAssistantOutput> {
  return aiGuidanceAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiGuidanceAssistantPrompt',
  input: {schema: AIGuidanceAssistantInputSchema},
  output: {schema: AIGuidanceAssistantOutputSchema},
  prompt: `You are now inside the Career Guide section of the "Programming Adroitness Innovation" platform.
Your role is to help the student discover their career path in the world of programming.
Your tone should be: Directive - Analytical - Inspiring - Practical.
Your goal is to build a future learning and career plan that fits the student's skills.
Do not provide code snippets or technical solutions here.

Your focus is on:
- Analyzing skills and interests.
- Suggesting suitable specializations.
- Providing an organized learning roadmap.
- Explaining job market requirements.
- Tips for building a CV and getting hired.

Student ID: {{{studentId}}}.

Respond to the following query:
{{{query}}}
  `,
});

const aiGuidanceAssistantFlow = ai.defineFlow(
  {
    name: 'aiGuidanceAssistantFlow',
    inputSchema: AIGuidanceAssistantInputSchema,
    outputSchema: AIGuidanceAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {response: output!.response};
  }
);
