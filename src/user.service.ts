import type { User, UserCreate, UserUpdate } from "./types/user.types";

export interface UserService {
  addUser(user: Partial<UserCreate>): Promise<User | null>;
  updateUser(
    id: string,
    updatedFields: Partial<UserUpdate>,
  ): Promise<User | null>;
  deleteUser(id: string): Promise<User | null>;
  getAllUsers(options?: {
    filter?: string;
    sort?: string;
    expand?: string[];
  }): Promise<User[] | null>;
}

export * from "./user.action";
