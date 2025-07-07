import { ApiError } from "../types";
import { logger } from "./logger";

export class ErrorHandler {
  public handle(error: any): void {
    const apiError: ApiError = this.parseError(error);
    logger.error(apiError.message, apiError);
  }

  private parseError(error: any): ApiError {
    if (error.response) {
      return {
        code: error.response.code || "UNKNOWN_ERROR",
        message: error.response.message || "未知错误",
        details: error.response.data,
      };
    }

    return {
      code: "UNKNOWN_ERROR",
      message: error.message || "发生未知错误",
      details: error,
    };
  }
}

/**
 * 封装错误处理逻辑
 * @param action 当前执行的动作描述，用于日志输出
 * @param callback 要执行的操作
 * @returns 成功返回结果，失败返回 null
 */
export const withErrorHandling = async <T>(
  action: string,
  callback: () => Promise<T>,
): Promise<T | null> => {
  try {
    const result = await callback();
    logger.success(action, result);
    return result;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    logger.error(action, message);
    return null;
  }
};
