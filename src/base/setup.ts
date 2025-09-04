import { usePBClient } from "./client";

// 导出动态集合获取函数
const getCollect = (name: string) => usePBClient().collection(name);

// 预定义的集合实例
const filesCollect = getCollect("files");
const productCollect = getCollect("products");
const profileCollect = getCollect("profile");

// 内置
const userCollect = getCollect("users");
const superusersCollect = getCollect("_superusers");

export {
  getCollect,
  filesCollect,
  productCollect,
  profileCollect,
  superusersCollect,
  userCollect,
};
