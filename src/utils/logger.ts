// utils/logger.ts
export class Logger {
  private enableConsole: boolean;

  constructor(enableConsole?: boolean) {
    // 默认: 非生产环境输出日志，生产环境不输出
    this.enableConsole =
      typeof enableConsole === "boolean"
        ? enableConsole
        : process.env.NODE_ENV !== "production";
  }

  success(message: string, data?: any) {
    if (this.enableConsole) {
      console.log(`✅ 成功: ${message}`, data ? JSON.stringify(data) : "");
    }
  }

  error(message: string, error?: any) {
    if (this.enableConsole) {
      console.error(`❌ 错误: ${message}`, error ? JSON.stringify(error) : "");
    }
  }

  warn(message: string, data?: any) {
    if (this.enableConsole) {
      console.warn(`⚠️ 警告: ${message}`, data ? JSON.stringify(data) : "");
    }
  }

  info(message: string, data?: any) {
    if (this.enableConsole) {
      console.info(`ℹ️ 信息: ${message}`, data ? JSON.stringify(data) : "");
    }
  }
}

// 默认导出: 根据 NODE_ENV 自动判断
export const logger = new Logger();
