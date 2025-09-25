import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { useAuth } from "../src/services/auth.action"; // Import directly to ensure latest changes
import PocketBase from "pocketbase";
import { clear, setup, TEST_CONFIG } from "./config";

describe("[ useAuth 客户端覆盖测试 ]", () => {
    beforeEach(setup);
    afterEach(clear);

    test("测试登录时使用正确的覆盖 URL", async () => {
        const admin = await useAuth.login('admin', TEST_CONFIG.admin, { url: TEST_CONFIG.url });

        expect(admin?.record?.email).toEqual(TEST_CONFIG.admin.email);
    });

    test("测试登录时使用正确的覆盖实例", async () => {
        const customInstance = new PocketBase(TEST_CONFIG.url);
        const admin = await useAuth.login('admin', TEST_CONFIG.admin, { instance: customInstance });

        expect(admin?.record?.email).toEqual(TEST_CONFIG.admin.email);
    });

    test("测试登录时使用不正确的覆盖 URL 导致失败", async () => {
        const customUrl = "http://localhost:9999"; // A dummy URL that should not be reachable
        const testAccount = {
            email: "test@example.com",
            password: "password123",
        };

        // Expect the login to fail because the customUrl is invalid/unreachable
        await expect(useAuth.login('admin', testAccount, { url: customUrl })).rejects.toThrow();
    });

    test("测试登录时使用不正确的覆盖实例导致失败", async () => {
        const customInstance = new PocketBase("http://localhost:9998"); // Another dummy instance
        const testAccount = {
            email: "test@example.com",
            password: "password123",
        };

        // Expect the login to fail because the customInstance points to an invalid/unreachable URL
        await expect(useAuth.login('admin', testAccount, { instance: customInstance })).rejects.toThrow();
    });
});
