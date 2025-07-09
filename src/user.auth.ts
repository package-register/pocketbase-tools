import pb, { superCollect, userCollect } from "./base";
import { UserLogin } from "./types";
import { withErrorHandling } from "./utils/errorHandler";
import { logger } from "./utils/logger";

export async function login(role: "admin" | "user", account: UserLogin) {
  if (!account.password) throw new Error("缺少密码");

  return withErrorHandling(`${role} 认证`, async () => {
    const authData =
      role === "admin"
        ? await superCollect.authWithPassword(account.email!, account.password)
        : await userCollect.authWithPassword(
            account.username!,
            account.password,
          );

    logger.success(`${role} 认证成功`);
    return authData;
  });
}

export async function logout() {
  return withErrorHandling("登出", async () => {
    pb.authStore.clear();
    logger.success("已登出");
  });
}

export async function refresh(role: "admin" | "user") {
  return withErrorHandling(`获取${role}信息`, async () => {
    const data =
      role === "admin"
        ? await superCollect.authRefresh()
        : await userCollect.authRefresh();

    logger.success(`获取${role}信息成功`, data);
    return data;
  });
}

export async function verify(email: string) {
  return withErrorHandling(`验证 ${email} 邮箱`, async () => {
    return userCollect.requestVerification(email);
  });
}
