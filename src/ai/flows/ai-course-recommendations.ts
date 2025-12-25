'use server';
/**
 * @fileOverview An AI course recommendation agent.
 *
 * - aiCourseRecommendations - A function that suggests relevant courses based on user interests and learning goals.
 * - AICourseRecommendationsInput - The input type for the aiCourseRecommendations function.
 * - AICourseRecommendationsOutput - The return type for the aiCourseRecommendations function.
 */

import {ai} from '@/ai';
import {z} from 'genkit';

const AICourseRecommendationsInputSchema = z.object({
  interests: z.string().describe('The user interests.'),
  learningGoals: z.string().describe('The user learning goals.'),
});
export type AICourseRecommendationsInput = z.infer<
  typeof AICourseRecommendationsInputSchema
>;

const AICourseRecommendationsOutputSchema = z.object({
  suggestedCourses: z
    .array(z.string())
    .describe('The list of suggested courses based on interests and goals.'),
});
export type AICourseRecommendationsOutput = z.infer<
  typeof AICourseRecommendationsOutputSchema
>;

export async function aiCourseRecommendations(
  input: AICourseRecommendationsInput
): Promise<AICourseRecommendationsOutput> {
  return aiCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCourseRecommendationsPrompt',
  input: {schema: AICourseRecommendationsInputSchema},
  output: {schema: AICourseRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant courses based on user interests and learning goals.

  Suggest courses that align with the user's interests and learning goals.

  Interests: {{{interests}}}
  Learning Goals: {{{learningGoals}}}

  Return a list of suggested courses.`,
});

const aiCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiCourseRecommendationsFlow',
    inputSchema: AICourseRecommendationsInputSchema,
    outputSchema: AICourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
