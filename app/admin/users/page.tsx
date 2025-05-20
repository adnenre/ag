"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Check,
  X,
  Shield,
  User,
  Users,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useLanguage } from "@/contexts/language-context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DateTime } from "@/components/ui/DateTime";
// Mock user data
interface UserData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  location: string;
  createdAt: string;
}
const initialUsersData = [
  {
    id: 1,
    name: "John Farmer",
    email: "john@farmexample.com",
    role: "farmer",
    status: "active",
    subscription: "Pro",
    lastLogin: "2023-05-15",
    registeredDate: "2023-01-10",
  },
  {
    id: 2,
    name: "Sarah Green",
    email: "sarah@farmexample.com",
    role: "farmer",
    status: "inactive",
    subscription: "Basic",
    lastLogin: "2023-05-10",
    registeredDate: "2023-02-15",
  },
  {
    id: 3,
    name: "Mike Agent",
    email: "mike@marketagent.com",
    role: "agent",
    status: "active",
    subscription: "Enterprise",
    lastLogin: "2023-05-14",
    registeredDate: "2022-11-20",
  },
  {
    id: 4,
    name: "Lisa Market",
    email: "lisa@marketagent.com",
    role: "agent",
    status: "pending",
    subscription: "Pro",
    lastLogin: "-",
    registeredDate: "2023-05-12",
  },
  {
    id: 5,
    name: "Admin User",
    email: "admin@agriconnect.com",
    role: "admin",
    status: "active",
    subscription: "-",
    lastLogin: "2023-05-15",
    registeredDate: "2022-01-01",
  },
  {
    id: 6,
    name: "Content Editor",
    email: "editor@agriconnect.com",
    role: "editor",
    status: "active",
    subscription: "-",
    lastLogin: "2023-05-13",
    registeredDate: "2022-06-15",
  },
];

export default function UsersPage() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);

        const usersList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserData[];

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  // Filter users based on search query and filters
  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (roleFilter === "all" || user.role === roleFilter)
    //&&
    // (statusFilter === "all" || user.status === statusFilter),
  );

  const toggleUserStatus = (id, newStatus) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          const updatedUser = { ...user, status: newStatus };
          toast({
            title: `User ${
              newStatus === "active" ? "activated" : "deactivated"
            }`,
            description: `${user.name} has been ${
              newStatus === "active" ? "activated" : "deactivated"
            }.`,
          });
          return updatedUser;
        }
        return user;
      })
    );
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "farmer":
        return <User className="h-4 w-4 text-green-500" />;
      case "agent":
        return <Users className="h-4 w-4 text-blue-500" />;
      case "editor":
        return <Edit className="h-4 w-4 text-purple-500" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Inactive
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and their subscription status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center w-full md:w-auto space-x-2">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full md:w-[250px]"
              />
              <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <div className="flex items-center w-full md:w-auto space-x-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="farmer">Farmers</SelectItem>
                  <SelectItem value="agent">Market Agents</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="editor">Editors</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>location</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>

                  <TableHead>Role</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>
                    <Button variant="ghost" className="p-0 h-8 font-medium">
                      Registered
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-center">Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.subscription}</TableCell>
                      <TableCell>
                        <DateTime date={user.createdAt} />
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={user.status === "active"}
                          onCheckedChange={(checked) =>
                            toggleUserStatus(
                              user.id,
                              checked ? "active" : "inactive"
                            )
                          }
                          disabled={user.role === "admin"} // Don't allow deactivating admins
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            {user.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    toggleUserStatus(user.id, "active")
                                  }
                                >
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                  Approve User
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <X className="mr-2 h-4 w-4" />
                                  Reject User
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
