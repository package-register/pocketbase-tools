import { usePBClient } from "../base/client";
import { User, UserCreate, UserUpdate } from "../types";
import { logger, withErrorHandling } from "../utils";

function toUser(record: any): User {
  // 自动映射所有 User 字段，防止遗漏，并为 undefined 字段提供默认值
  return {
    collectionId: record.collectionId ?? undefined,
    collectionName: record.collectionName ?? undefined,
    id: record.id ?? undefined,
    email: record.email ?? "",
    name: record.name ?? undefined,
    emailVisibility: record.emailVisibility ?? undefined,
    avatar: record.avatar ?? undefined,
    verified: record.verified ?? undefined,
    created: record.created ?? undefined,
    updated: record.updated ?? undefined,
  };
}

/**
 * 获取所有用户列表
 * @param options 可选过滤
 */
export async function getAllUsers(
  options: {
    filter?: string;
    sort?: string;
    expand?: string[];
  } = {},
): Promise<User[] | null> {
  return withErrorHandling("获取所有用户列表", async () => {
    const pb = usePBClient();
    const userCollect = pb.collection("users");
    const users = await userCollect.getFullList({
      filter: options.filter,
      sort: options.sort || "-created",
      expand: options.expand?.join(","),
    });
    logger.success(`成功获取用户列表`, {
      total: users.length,
      filter: options.filter,
    });
    return users.map(toUser);
  });
}

/**
 * 添加用户
 */
export async function addUser(user: Partial<UserCreate>): Promise<User | null> {
  return withErrorHandling("添加用户", async () => {
    const pb = usePBClient();
    const userCollect = pb.collection("users");
    const result = await userCollect.create(user);
    logger.success("添加用户成功", result);
    return toUser(result);
  });
}

/**
 * 更新用户
 */
export async function updateUser(
  id: string,
  updatedFields: Partial<UserUpdate>,
): Promise<User | null> {
  return withErrorHandling("更新用户", async () => {
    const pb = usePBClient();
    const userCollect = pb.collection("users");
    const updated = await userCollect.update(id, updatedFields);
    logger.success("用户更新成功", updated);
    return toUser(updated);
  });
}

/**
 * 删除用户
 */
export async function deleteUser(id: string): Promise<boolean | null> {
  return withErrorHandling("删除用户", async () => {
    const pb = usePBClient();
    const userCollect = pb.collection("users");
    const deleted = await userCollect.delete(id);
    logger.success("用户删除成功", deleted);
    return !!deleted;
  });
}
