"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/lib/data";
import { ArrowRight, BookOpenCheck, Gem, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export default function DashboardPage() {
  const { t } = useLanguage();
  const inProgressCourses = courses.filter(c => c.progress && c.progress > 0 && c.progress < 100).slice(0, 2);
  const suggestedCourses = courses.filter(c => !c.progress || c.progress === 0).slice(0, 3);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-headline text-3xl font-bold tracking-tight">{t('welcome_back')}</h2>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('courses_in_progress')}</CardTitle>
                    <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{inProgressCourses.length}</div>
                    <p className="text-xs text-muted-foreground">{t('keep_up_great_work')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('weekly_goal')}</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5/10 {t('hours')}</div>
                    <Progress value={50} className="mt-2 h-2" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('ai_recommendations')}</CardTitle>
                    <Gem className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{suggestedCourses.length}</div>
                     <p className="text-xs text-muted-foreground">{t('new_courses_picked')}</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">{t('continue_learning')}</CardTitle>
                <CardDescription>{t('pick_up_where_you_left_off')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inProgressCourses.map(course => (
                  <div key={course.id} className="flex items-center space-x-4 rounded-md border p-4">
                    <Image
                      src={course.image.imageUrl}
                      alt={course.title}
                      width={80}
                      height={60}
                      className="rounded-md"
                      data-ai-hint={course.image.imageHint}
                    />
                    <div className="flex-1">
                      <p className="font-headline text-sm font-semibold">{course.title}</p>
                      <Progress value={course.progress} className="mt-2 h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{course.progress}% {t('complete')}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/courses`}>{t('resume')}</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">{t('suggested_for_you')}</CardTitle>
                <CardDescription>{t('new_courses_based_on_interests')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedCourses.slice(0,3).map(course => (
                   <Link href={`/dashboard/courses`} key={course.id} className="flex items-center space-x-3 rounded-md p-2 hover:bg-secondary">
                      <Image
                        src={course.image.imageUrl}
                        alt={course.title}
                        width={64}
                        height={48}
                        className="rounded-md"
                        data-ai-hint={course.image.imageHint}
                      />
                      <div className="flex-1">
                         <p className="font-headline text-sm font-semibold truncate">{course.title}</p>
                         <p className="text-xs text-muted-foreground">{course.category}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                ))}
              </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </>
  );
}
