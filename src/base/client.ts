import PocketBase from "pocketbase";
import { getEnvVar } from "../utils/env";

// 单例管理
let globalInstance: PocketBase | null = null;
let customInstance: PocketBase | null = null;

function createPBClient(baseUrl: string): PocketBase {
  return new PocketBase(baseUrl);
}

function initGlobalInstance(): PocketBase {
  const baseUrl = getEnvVar("VITE_POCKETBASE_URL", "http://localhost:8090");
  globalInstance = createPBClient(baseUrl);
  return globalInstance;
}

/**
 * 获取或创建 PocketBase 客户端
 * @param options 配置选项
 *   - url: 指定服务地址创建新实例
 *   - instance: 直接注入实例
 *   - override: 是否强制覆盖现有实例 (默认false)
 */
export function usePBClient(options?: {
  url?: string;
  instance?: PocketBase;
  override?: boolean;
}): PocketBase {
  // 强制重置实例
  if (options?.override) {
    if (options.instance) {
      customInstance = options.instance;
      return customInstance;
    }
    if (options.url) {
      customInstance = createPBClient(options.url);
      return customInstance;
    }
    resetPBInstances();
  }

  // 1. 使用传入的实例
  if (options?.instance) {
    if (!customInstance || options.override !== false) {
      customInstance = options.instance;
    }
    return customInstance;
  }

  // 2. 使用传入的URL
  if (options?.url) {
    if (!customInstance || options.override !== false) {
      customInstance = createPBClient(options.url);
    }
    return customInstance;
  }

  // 3. 返回现有实例
  if (customInstance) return customInstance;
  if (globalInstance) return globalInstance;

  // 4. 初始化默认实例
  return initGlobalInstance();
}

export function resetPBInstances() {
  globalInstance = null;
  customInstance = null;
}
