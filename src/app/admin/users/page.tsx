import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const users = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Student",
        joined: "2024-01-15",
        avatar: "https://picsum.photos/seed/user1/40/40"
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Student",
        joined: "2024-02-20",
        avatar: "https://picsum.photos/seed/user2/40/40"
    },
    {
        name: "Admin User",
        email: "admin@example.com",
        role: "Admin",
        joined: "2024-01-01",
        avatar: "https://picsum.photos/seed/admin/40/40"
    }
]

export default function AdminUsersPage() {
  return (
    <>
      <h2 className="font-headline text-3xl font-bold tracking-tight">User Management</h2>
        <Card>
            <CardHeader>
                <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            </CardContent>
        </Card>
    </>
  );
}
