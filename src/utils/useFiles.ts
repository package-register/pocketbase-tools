// 获取指定 collection 下文件的下载 URL 和授权 Token
// 用法: const [fileUrl, token] = useFiles.getCollectionURL(collection, fileName)
import { RecordModel } from "pocketbase";
import pb from "../base";

export const useFiles = {
  /**
   * 获取指定 collection 下文件的下载 URL 和授权 Token
   * @param collection RecordModel 记录
   * @param fileName 文件名
   * @returns [url, token]
   */
  async getCollectionURL(
    collection: RecordModel,
    fileName: string,
  ): Promise<[string, string]> {
    // 获取当前用户的 token
    const token = await pb.files.getToken();
    // 拼接文件下载 URL
    const url = pb.files.getURL(collection, fileName);
    return [url, token];
  },
};
