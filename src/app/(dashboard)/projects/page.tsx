"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Star } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";

const projects = [
    {
        id: 1,
        title: "AI-Powered Chatbot for Customer Service",
        author: "Jane Doe",
        description: "A chatbot that uses NLP to understand and respond to customer queries in real-time.",
        imageUrl: "https://picsum.photos/seed/project1/600/400",
        imageHint: "chatbot interface",
        stars: 128
    },
    {
        id: 2,
        title: "E-commerce Recommendation Engine",
        author: "John Smith",
        description: "A machine learning model that suggests products to users based on their browsing history.",
        imageUrl: "https://picsum.photos/seed/project2/600/400",
        imageHint: "ecommerce products",
        stars: 256
    },
    {
        id: 3,
        title: "Personal Finance Tracker",
        author: "Alex Ray",
        description: "A web application to help users track their income and expenses, with data visualization.",
        imageUrl: "https://picsum.photos/seed/project3/600/400",
        imageHint: "finance charts",
        stars: 96
    }
]

export default function ProjectsPage() {
  const { t } = useLanguage();

  return (
    <>
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="font-headline text-3xl font-bold tracking-tight">{t('project_showcase')}</h2>
                <p className="text-muted-foreground">
                    {t('project_showcase_desc')}
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('submit_project')}
            </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
                 <Card key={project.id} className="flex flex-col">
                    <CardHeader className="p-0">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={600}
                            height={400}
                            className="w-full rounded-t-lg"
                            data-ai-hint={project.imageHint}
                        />
                         <div className="p-6 pb-0">
                            <CardTitle className="font-headline text-xl leading-tight">{project.title}</CardTitle>
                            <CardDescription>{t('by_author', { author: project.author })}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-6">
                        <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost" size="sm">
                            <Star className="mr-2 h-4 w-4" />
                            {project.stars} {t('stars')}
                        </Button>
                    </CardFooter>
                 </Card>
            ))}
        </div>
    </>
  );
}
