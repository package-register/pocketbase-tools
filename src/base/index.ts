import { createPBClient } from "../client";

// 获取 baseUrl，优先使用环境变量
const baseUrl =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_POCKETBASE_URL) ||
  process.env.VITE_POCKETBASE_URL ||
  "http://localhost:8090";

const pb = createPBClient(baseUrl);

export const userCollect = pb.collection("users");
export const productCollect = pb.collection("products");
export const profileCollect = pb.collection("profile");
export const superCollect = pb.collection("_superusers");

export default pb;
export * from "./BaseService";
export * from "./bootstrap";
