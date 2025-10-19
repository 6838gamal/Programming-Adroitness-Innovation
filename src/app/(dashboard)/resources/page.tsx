"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { resources } from "@/lib/data";
import { Library, Search } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function ResourcesPage() {
  const { t } = useLanguage();

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight">{t('resource_library')}</h2>
          <p className="text-muted-foreground">
            {t('resource_library_desc')}
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('all_resources')}</CardTitle>
          <CardDescription>
            <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t('search_resources')} className="pl-8" />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('title')}</TableHead>
                <TableHead>{t('type')}</TableHead>
                <TableHead>{t('category')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('author')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>{resource.date}</TableCell>
                  <TableCell>{resource.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
