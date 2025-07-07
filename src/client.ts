import PocketBase from "pocketbase";
import { ClientConfig } from "./types";

/**
 * 创建 PocketBase 客户端实例
 * @param config baseUrl 或 { baseUrl }
 */
// export function createPBClient(config: ClientConfig | string): PocketBase {
//   const configuration =
//     typeof config === "string" ? { baseUrl: config } : config;
//   return new PocketBase(configuration.baseUrl);
// }

export type PBClientFactory = (baseUrl: string) => PocketBase;

export function createPBClient(
  config: ClientConfig | string,
  clientFactory: PBClientFactory = (baseUrl) => new PocketBase(baseUrl),
): PocketBase {
  const configuration =
    typeof config === "string" ? { baseUrl: config } : config;

  return clientFactory(configuration.baseUrl);
}
