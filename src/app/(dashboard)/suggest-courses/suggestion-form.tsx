"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { aiCourseRecommendations } from "@/ai/flows/ai-course-recommendations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck, Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const formSchema = z.object({
  interests: z.string().min(10, {
    message: "Please tell us a bit more about your interests.",
  }).max(500),
  learningGoals: z.string().min(10, {
    message: "Please describe your learning goals in more detail.",
  }).max(500),
});

type FormValues = z.infer<typeof formSchema>;

export function SuggestionForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [suggestedCourses, setSuggestedCourses] = useState<string[]>([]);
  const { t } = useLanguage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      learningGoals: "",
    },
  });

  function onSubmit(values: FormValues) {
    setSuggestedCourses([]);
    startTransition(async () => {
      const result = await aiCourseRecommendations(values);
      if (result.suggestedCourses) {
        setSuggestedCourses(result.suggestedCourses);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not generate course recommendations. Please try again.",
        });
      }
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('your_interests')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('interests_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('interests_desc')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="learningGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('your_learning_goals')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('learning_goals_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t('learning_goals_desc')}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('suggest_courses')}
          </Button>
        </form>
      </Form>
      <div>
        <Card className="min-h-full">
            <CardHeader>
                <CardTitle className="font-headline">{t('ai_recommendations')}</CardTitle>
            </CardHeader>
            <CardContent>
                {isPending && (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}
                {!isPending && suggestedCourses.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-10">{t('suggested_courses_appear_here')}</p>
                )}
                {suggestedCourses.length > 0 && (
                    <ul className="space-y-2">
                        {suggestedCourses.map((course, index) => (
                            <li key={index} className="flex items-center gap-3 p-3 rounded-md bg-muted">
                                <BookOpenCheck className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">{course}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
