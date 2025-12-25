"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const studyGroups = [
    {
        id: 1,
        name: "Web Dev Wizards",
        topic: "Web Development",
        members: 42,
        avatar: "https://picsum.photos/seed/group1/40/40"
    },
    {
        id: 2,
        name: "AI Innovators",
        topic: "Artificial Intelligence",
        members: 78,
        avatar: "https://picsum.photos/seed/group2/40/40"
    },
    {
        id: 3,
        name: "Cyber Sentinels",
        topic: "Cybersecurity",
        members: 35,
        avatar: "https://picsum.photos/seed/group3/40/40"
    },
    {
        id: 4,
        name: "Data Dynamos",
        topic: "Data Science",
        members: 55,
        avatar: "https://picsum.photos/seed/group4/40/40"
    }
]

export default function GroupsPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight">{t('study_groups')}</h2>
          <p className="text-muted-foreground">{t('study_groups_desc')}</p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
            <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t('search_groups')} className="pl-8 sm:w-64" />
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('create_group')}
            </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {studyGroups.map(group => (
            <Card key={group.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={group.avatar} />
                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="font-headline text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.topic}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{group.members} {t('members')}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">{t('join_group')}</Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </>
  );
}
