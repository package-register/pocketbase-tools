import { expect } from "bun:test";
import pb from '../src/index';

export const TEST_CONFIG = {
    url: "http://192.168.3.5:8090",
    admin: {
        email: "hnkong666@gmail.com",
        password: "skongroot"
    },
    output: false
}

export const setup = async () => {
    // 每个测试前设置测试实例
    const tom = await pb.health.check()

    expect(tom?.code).toEqual(200)
    expect(pb.baseURL).toEqual("http://192.168.3.5:8090")

    if (TEST_CONFIG.output)
        console.log("🔧 测试环境已设置");
}

export const clear = async () => {
    // 每个测试后清理环境
    pb.authStore.clear();

    expect(pb.authStore.token).toEqual("")

    if (TEST_CONFIG.output)
        console.log("🧹 测试环境已清理");
};