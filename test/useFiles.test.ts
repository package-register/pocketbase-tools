// index.test.test
import { afterEach, beforeEach, describe, test } from "bun:test";
import { filesCollect, useAuth, useFiles } from "../src";
import { clear, setup, TEST_CONFIG } from "./config";

describe("[ useFiles 测试 ]", () => {
    // 测试之前
    beforeEach(async () => {
        // 清理函数
        await setup()

        // 登录
        await useAuth.login('admin', TEST_CONFIG.admin)
    });

    test("测试文件路径获取", async () => {
        // 获取最新的文件记录
        const [record] = await filesCollect.getFullList({
            sort: '-created',
            limit: 1,
        });
        // 获取文件信息
        console.log(useFiles.getAbsoluteURL(record, record?.file))
    })

    // 关闭之后
    afterEach(clear);
});
