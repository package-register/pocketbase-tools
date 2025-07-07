import { IBaseService } from ".";

export interface IUserService extends IBaseService {
  authenticate(email: string, password: string): Promise<any>;
  requestPasswordReset(email: string): Promise<void>;
  confirmPasswordReset(
    token: string,
    password: string,
    passwordConfirm: string,
  ): Promise<void>;
  refreshToken(): Promise<any>;
  getProfile(): Promise<any>;
}

export interface User {
  collectionId?: string;
  collectionName?: string;
  id?: string;
  email: string;
  name?: string;
  emailVisibility?: boolean;
  avatar?: string;
  verified?: boolean;
  created?: string;
  updated?: string;
}

export type UserCreate = User & {
  password: string;
  passwordConfirm: string;
};

export type UserUpdate = Partial<User> & {
  oldPassword?: string;
  password?: string;
  passwordConfirm?: string;
};

export interface UserAction {
  addUser(user: Partial<UserCreate>): Promise<User | null>;
  updateUser(
    id: string,
    updatedFields: Partial<UserUpdate>,
  ): Promise<User | null>;
  deleteUser(id: string): Promise<User | null>;
}

export interface UserService {
  getAllUsers(options?: {
    filter?: string;
    sort?: string;
    expand?: string[];
  }): Promise<User[] | null>;
}
