import { expect } from "bun:test";
import { usePBClient, resetPBInstances } from '../src/base/client'; // Import usePBClient and resetPBInstances directly
import PocketBase from "pocketbase"; // Import PocketBase for type hinting

export const TEST_CONFIG = {
    url: "http://127.0.0.1:8090",
    admin: {
        email: "admin@gmail.com",
        password: "admin123456"
    },
    output: false
}

// Get the PocketBase client instance for the test environment
let testPb: PocketBase;

export const setup = async () => {
    // Reset instances to ensure a clean state for each test
    resetPBInstances();
    // Set up the custom instance for testing
    testPb = usePBClient({ url: TEST_CONFIG.url, override: true });

    // Perform a health check to ensure connection
    const healthCheck = await testPb.health.check();

    expect(healthCheck?.code).toEqual(200);
    expect(testPb.baseURL).toEqual(TEST_CONFIG.url);

    if (TEST_CONFIG.output)
        console.log("🔧 测试环境已设置");
}

export const clear = async () => {
    // Clear auth store for the test instance
    testPb.authStore.clear();

    expect(testPb.authStore.token).toEqual("");

    // Reset instances after each test to avoid interference
    resetPBInstances();

    if (TEST_CONFIG.output)
        console.log("🧹 测试环境已清理");
};
