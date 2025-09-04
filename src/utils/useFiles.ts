import { RecordModel } from "pocketbase";
import { usePBClient } from "../base/client";

interface IFilesAPI {
  /**
   * 获取文件访问令牌
   * @returns Promise<string> 返回文件访问令牌
   */
  getTokenPayload(): Promise<string>;
  /**
   * 获取指定 record 下文件的下载 URL
   * @param record RecordModel 记录
   * @param fileFiled 需要下载的文件字段
   * @returns url 文件下载 URL
   */
  getAbsoluteURL(record: RecordModel, fileFiled: string): string;
}

const getInstance = () => usePBClient();

export const useFiles: IFilesAPI = {
  getTokenPayload: async (): Promise<string> => {
    return await getInstance().files.getToken();
  },
  getAbsoluteURL: (record: RecordModel, fileFiled: string): string => {
    return getInstance().files.getURL(record, fileFiled);
  },
};
