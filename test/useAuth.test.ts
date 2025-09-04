// index.test.test
import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { useAuth } from "../src";
import { clear, setup, TEST_CONFIG } from "./config";

describe("[ useAuth 测试 ]", () => {
    // 测试之前
    beforeEach(setup);

    test("测试登录", async () => {
        // 管理员登录
        const admin = await useAuth.login('admin', TEST_CONFIG.admin)

        // 判断是否正确
        expect(admin?.record?.email).toEqual(TEST_CONFIG.admin.email);
    })

    // 关闭之后
    afterEach(clear);
});
