'use server';
/**
 * @fileOverview This file defines the AI Smart Assistant flow for personalized learning support.
 *
 * - aiSmartAssistant - The main function to interact with the AI Smart Assistant.
 * - AISmartAssistantInput - The input type for the aiSmartAssistant function.
 * - AISmartAssistantOutput - The output type for the aiSmart-assistant function.
 */

import {ai} from '@/ai';
import {z} from 'genkit';

const AISmartAssistantInputSchema = z.object({
  query: z.string().describe('The user query or request for assistance.'),
  studentId: z.string().describe('The unique identifier for the student.'),
});
export type AISmartAssistantInput = z.infer<typeof AISmartAssistantInputSchema>;

const AISmartAssistantOutputSchema = z.object({
  response: z.string().describe('The AI Assistant response to the user query.'),
});
export type AISmartAssistantOutput = z.infer<
  typeof AISmartAssistantOutputSchema
>;

export async function aiSmartAssistant(
  input: AISmartAssistantInput
): Promise<AISmartAssistantOutput> {
  return aiSmartAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSmartAssistantPrompt',
  input: {schema: AISmartAssistantInputSchema},
  output: {schema: AISmartAssistantOutputSchema},
  prompt: `You are now inside the AI Assistant section of the "PAI Smart Academy" platform.
Your identity is an expert software assistant who explains in clear language and provides practical solutions.
Your tone should be: Technical - Educational - Motivational - Practical.
Your goal is to help the student understand programming and solve technical problems.
Use a simplified style, give direct solutions with code and examples.
Do not talk about career paths or job opportunities here. This is for the Career Guide.

Your focus is to:
- Explain code snippets.
- Detect and correct errors (debugging).
- Simplify complex programming concepts.
- Suggest improvements for code and projects.
- Train the student on logical and programmatic thinking.

Student ID: {{{studentId}}}.

Respond to the following query:
{{{query}}}
  `,
});

const aiSmartAssistantFlow = ai.defineFlow(
  {
    name: 'aiSmartAssistantFlow',
    inputSchema: AISmartAssistantInputSchema,
    outputSchema: AISmartAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {response: output!.response};
  }
);
