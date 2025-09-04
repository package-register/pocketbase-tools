/**
 * 安全获取环境变量
 * @param key 环境变量键名
 * @param defaultValue 可选默认值
 * @returns 环境变量值或默认值
 * @throws 当没有默认值且变量未设置时抛出错误
 */
export function getEnvVar(key: string, defaultValue?: string): string {
  // 浏览器环境 (Vite)
  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return (import.meta.env[key] as string) || defaultValue!;
  }

  // Node.js 环境 (处理SSR场景)
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key] || defaultValue!;
  }

  if (defaultValue !== undefined) return defaultValue;

  throw new Error(`[Config Error] 必需环境变量未配置: ${key}`);
}

/**
 * 验证必需环境变量
 */
export function validateEnvVars(requiredVars: string[]) {
  requiredVars.forEach(key => {
    try {
      getEnvVar(key);
    } catch (err: any) {
      console.warn(`[Env Warning] ${err.message}`);
    }
  });
}
