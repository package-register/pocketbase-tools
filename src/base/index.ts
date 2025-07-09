import { usePBClient } from "./client";

export * from "./BaseService";
export * from "./bootstrap";
export * from "./client";

// 默认导出初始化好的实例（可被后续覆盖）
const pb = usePBClient();

// 导出特定集合（保持向后兼容）
export const userCollect = pb.collection("users");
export const productCollect = pb.collection("products");
export const profileCollect = pb.collection("profile");
export const superCollect = pb.collection("_superusers");

export default pb;
