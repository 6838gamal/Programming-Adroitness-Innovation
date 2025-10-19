"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses, courseCategories } from "@/lib/data";
import { Clock, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export default function CoursesPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight">{t('course_library')}</h2>
            <p className="text-muted-foreground">{t('course_library_desc')}</p>
        </div>
        <div className="w-full sm:w-auto">
            <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder={t('all_categories')} />
                </SelectTrigger>
                <SelectContent>
                    {courseCategories.map(category => (
                        <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="p-0">
                <div className="relative">
                    <Image
                        src={course.image.imageUrl}
                        alt={course.title}
                        width={600}
                        height={400}
                        className="w-full rounded-t-lg"
                        data-ai-hint={course.image.imageHint}
                    />
                    <Badge className="absolute top-2 right-2">{course.level}</Badge>
                </div>
                <div className="p-6 pb-0">
                    <CardTitle className="font-headline text-xl leading-tight">
                        <Link href="#" className="hover:text-primary transition-colors">{course.title}</Link>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <p className="text-muted-foreground line-clamp-3">{course.description}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4 p-6 pt-0">
              <div className="flex w-full justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span>{course.lessons} {t('lessons')}</span>
                  </div>
              </div>
              <Button asChild className="w-full">
                <Link href="#">{t('start_learning')}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
