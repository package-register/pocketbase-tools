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
