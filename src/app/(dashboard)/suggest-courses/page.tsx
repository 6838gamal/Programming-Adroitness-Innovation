"use client";

import { Gem } from "lucide-react";
import { SuggestionForm } from "./suggestion-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

export default function SuggestCoursesPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex items-center gap-4">
        <Gem className="h-8 w-8 text-accent" />
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight">{t('ai_course_suggestions')}</h2>
          <p className="text-muted-foreground">
            {t('ai_course_suggestions_desc')}
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">{t('find_your_next_course')}</CardTitle>
        </CardHeader>
        <CardContent>
            <SuggestionForm />
        </CardContent>
      </Card>
    </>
  );
}
