"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityPosts } from "@/lib/data";
import { Heart, MessageSquare, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export default function CommunityPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight">{t('community_hub')}</h2>
            <p className="text-muted-foreground">{t('community_hub_desc')}</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t('new_post')}
        </Button>
      </div>
      <Tabs defaultValue="discussions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="discussions">{t('discussions')}</TabsTrigger>
          <TabsTrigger value="showcase" asChild><Link href="/dashboard/projects">{t('project_showcase')}</Link></TabsTrigger>
          <TabsTrigger value="groups" asChild><Link href="/dashboard/groups">{t('study_groups')}</Link></TabsTrigger>
        </TabsList>
        <TabsContent value="discussions" className="space-y-4">
            {communityPosts.map(post => (
                <Card key={post.id}>
                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                        <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <CardTitle className="font-headline text-lg">{post.title}</CardTitle>
                            <CardDescription>
                                {t('posted_by', { name: post.author.name })} • {post.timestamp}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{post.content}</p>
                    </CardContent>
                    <CardFooter className="flex space-x-4">
                        <Button variant="ghost" size="sm">
                            <Heart className="mr-2 h-4 w-4" />
                            {post.likes} {t('likes')}
                        </Button>
                        <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {post.comments} {t('comments')}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </TabsContent>
      </Tabs>
    </>
  );
}
