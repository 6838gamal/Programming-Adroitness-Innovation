import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { courses } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function AdminCoursesPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Course Management</h2>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Course
        </Button>
      </div>
        <Card>
            <CardHeader>
                <CardTitle>All Courses</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Lessons</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.level}</Badge>
                  </TableCell>
                  <TableCell>{course.lessons}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            </CardContent>
        </Card>
    </>
  );
}
