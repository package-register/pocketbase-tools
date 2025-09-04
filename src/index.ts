import { usePBClient } from "./base/client";

// 基础模块导出
export * from "./base/client";
export * from "./base/setup";

// 类型定义导出
export * from "./types";

// 工具函数导出
export * from "./utils";

// 服务模块导出
export * from "./services/auth.action";
export * from "./services/product.action";
export * from "./services/profile.action";
export * from "./services/user.action";

// const pb = usePBClient();

export default usePBClient();
