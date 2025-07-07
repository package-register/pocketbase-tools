import { createProductsCollection } from "../product.service";
import { createProfileCollection } from "../profile.action";

export interface InitCollectionsOptions {
  products?: boolean;
  profile?: boolean;
}

/**
 * 一键初始化所需表结构
 * @param options 选择要初始化的表，默认全部
 */
export async function initCollections(options: InitCollectionsOptions = {}) {
  const results = {} as Record<string, any>;
  // 默认全部 true
  const opts = { products: true, profile: true, ...options };

  if (opts.products) {
    results.products = await createProductsCollection();
  }
  if (opts.profile) {
    results.profile = await createProfileCollection();
  }
  // 可继续扩展更多表
  return results;
}
