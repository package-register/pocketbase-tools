import PocketBase, { RecordAuthResponse, RecordModel } from "pocketbase";
import { usePBClient } from "../base/client";
import { logger } from "../utils";
import { userCollect } from "../base/setup"; // Keep userCollect for verify function

export type Role = "admin" | "user";

type AuthType = RecordAuthResponse<RecordModel>;
type PromiseAuth = Promise<AuthType>;

export interface UserLogin {
  email?: string;
  username?: string;
  password?: string;
}

export interface AuthActions {
  login: (role: Role, account: UserLogin, clientOptions?: { url?: string; instance?: PocketBase }) => PromiseAuth;
  logout: () => void;

  refresh: (role: Role) => PromiseAuth;
  verify: (email: string) => Promise<boolean>;
}

// 常量定义
const AUTH_SUCCESS = "认证成功";
const LOGOUT_SUCCESS = "已登出";
const REFRESH_SUCCESS = "获取信息成功";
const VERIFY_EMAIL = "验证邮箱";

// 日志记录辅助函数
const logSuccess = (action: string, message: string, data?: any) =>
  logger.success(`${action} ${message}`, data);

// 获取 PocketBase 客户端实例
const getPBClient = (options?: { url?: string; instance?: PocketBase }) => usePBClient(options);

// 获取正确的集合名称
const getCollectionName = (role: Role) =>
  role === "admin" ? "_superusers" : "users";

// 获取正确的标识符字段
const getIdentifierField = (role: Role) =>
  role === "admin" ? "email" : "username";

// 登录函数
const login = async (role: Role, account: UserLogin, clientOptions?: { url?: string; instance?: PocketBase }): PromiseAuth => {
  const { password } = account;
  if (!password) throw new Error("缺少密码");

  const pb = getPBClient(clientOptions); // Use the provided client options
  const collectionName = getCollectionName(role); // Get the collection name
  const identifierField = getIdentifierField(role);
  const identifier = account[identifierField];

  if (!identifier)
    throw new Error(`缺少${identifierField === "email" ? "邮箱" : "用户名"}`);

  // Use the specific PocketBase instance for authentication
  const authData = await pb.collection(collectionName).authWithPassword(identifier, password);
  logSuccess(role, AUTH_SUCCESS);
  return authData;
};

// 登出函数
const logout = (): void => {
  const pb = getPBClient();
  if (pb.authStore.isValid) {
    pb.authStore.clear();
  }
  logSuccess("", LOGOUT_SUCCESS);
};

// 刷新认证信息函数
const refresh = async (role: Role, clientOptions?: { url?: string; instance?: PocketBase }): PromiseAuth => {
  const pb = getPBClient(clientOptions);
  const collectionName = getCollectionName(role);
  const data = await pb.collection(collectionName).authRefresh();
  logSuccess(role, REFRESH_SUCCESS, data);
  return data;
};

// 邮箱验证函数
const verify = async (email: string): Promise<boolean> => {
  const result = await userCollect.requestVerification(email);
  logSuccess(email, VERIFY_EMAIL);
  return result;
};

// 实现接口
export const useAuth: AuthActions = {
  login,
  logout,
  refresh,
  verify,
};
