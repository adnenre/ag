import {
  databases,
  DATABASE_ID,
  USERS_COLLECTION_ID,
  isAppwriteAvailable,
  generateId,
} from "@/lib/appwrite";
import { ID } from "appwrite";

// Dummy user data
const dummyUsers = [
  {
    id: "1",
    name: "John Farmer",
    email: "john@farmexample.com",
    role: "farmer",
    status: "active",
    subscription: "Pro",
    lastLogin: "2023-05-15",
    registeredDate: "2023-01-10",
  },
  {
    id: "2",
    name: "Sarah Green",
    email: "sarah@farmexample.com",
    role: "farmer",
    status: "inactive",
    subscription: "Basic",
    lastLogin: "2023-05-10",
    registeredDate: "2023-02-15",
  },
  {
    id: "3",
    name: "Mike Agent",
    email: "mike@marketagent.com",
    role: "agent",
    status: "active",
    subscription: "Enterprise",
    lastLogin: "2023-05-14",
    registeredDate: "2022-11-20",
  },
  {
    id: "4",
    name: "Lisa Market",
    email: "lisa@marketagent.com",
    role: "agent",
    status: "pending",
    subscription: "Pro",
    lastLogin: "-",
    registeredDate: "2023-05-12",
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@AgTunisie.com",
    role: "admin",
    status: "active",
    subscription: "-",
    lastLogin: "2023-05-15",
    registeredDate: "2022-01-01",
  },
  {
    id: "6",
    name: "Content Editor",
    email: "editor@AgTunisie.com",
    role: "editor",
    status: "active",
    subscription: "-",
    lastLogin: "2023-05-13",
    registeredDate: "2022-06-15",
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  subscription: string;
  lastLogin: string;
  registeredDate: string;
}

export const UserService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable();

      if (appwriteAvailable) {
        const response = await databases.listDocuments(
          DATABASE_ID,
          USERS_COLLECTION_ID
        );
        return response.documents as unknown as User[];
      } else {
        // Fallback to dummy data
        return dummyUsers;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback to dummy data on error
      return dummyUsers;
    }
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User | null> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable();

      if (appwriteAvailable) {
        const user = await databases.getDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          id
        );
        return user as unknown as User;
      } else {
        // Fallback to dummy data
        const user = dummyUsers.find((u) => u.id === id);
        return user || null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // Fallback to dummy data on error
      const user = dummyUsers.find((u) => u.id === id);
      return user || null;
    }
  },

  // Create a new user
  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable();

      if (appwriteAvailable) {
        const user = await databases.createDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          ID.unique(),
          userData
        );
        return user as unknown as User;
      } else {
        // Fallback to dummy data
        const newUser = {
          id: generateId(),
          ...userData,
        };
        dummyUsers.push(newUser);
        return newUser;
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Fallback to dummy data on error
      const newUser = {
        id: generateId(),
        ...userData,
      };
      dummyUsers.push(newUser);
      return newUser;
    }
  },

  // Update a user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable();

      if (appwriteAvailable) {
        const user = await databases.updateDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          id,
          userData
        );
        return user as unknown as User;
      } else {
        // Fallback to dummy data
        const index = dummyUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          dummyUsers[index] = { ...dummyUsers[index], ...userData };
          return dummyUsers[index];
        }
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Fallback to dummy data on error
      const index = dummyUsers.findIndex((u) => u.id === id);
      if (index !== -1) {
        dummyUsers[index] = { ...dummyUsers[index], ...userData };
        return dummyUsers[index];
      }
      throw new Error("User not found");
    }
  },

  // Delete a user
  deleteUser: async (id: string): Promise<void> => {
    try {
      const appwriteAvailable = await isAppwriteAvailable();

      if (appwriteAvailable) {
        await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, id);
      } else {
        // Fallback to dummy data
        const index = dummyUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          dummyUsers.splice(index, 1);
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Fallback to dummy data on error
      const index = dummyUsers.findIndex((u) => u.id === id);
      if (index !== -1) {
        dummyUsers.splice(index, 1);
      }
    }
  },
};
