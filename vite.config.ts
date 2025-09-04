import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "pocketbaseTools",
        formats: ["es", "cjs"],
        fileName: format => (format === "es" ? "index.mjs" : "index.cjs"),
      },
      rollupOptions: {
        external: ["pocketbase"],
        output: {
          globals: {
            pocketbase: "PocketBase",
          },
          exports: "named",
          // 生产环境下压缩变量名
          ...(isProduction && {
            manualChunks: undefined,
            compact: true,
          }),
        },
        // 生产环境下的额外优化
        ...(isProduction && {
          treeshake: {
            moduleSideEffects: false,
            propertyReadSideEffects: false,
            unknownGlobalSideEffects: false,
          },
        }),
      },
      // 根据环境决定是否压缩
      minify: isProduction ? "terser" : false,
      // 生产环境下的 Terser 配置
      ...(isProduction && {
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
            drop_debugger: true, // 移除 debugger
            pure_funcs: ["console.log", "console.info"], // 移除指定函数调用
            passes: 2, // 多次压缩以获得更好效果
          },
          mangle: {
            properties: {
              regex: /^_/, // 混淆以 _ 开头的属性名
            },
          },
          format: {
            comments: false, // 移除注释
          },
        },
      }),
      // 生产环境下生成 source map
      sourcemap: isProduction ? true : false,
      // 输出目录清理
      emptyOutDir: true,
    },
    plugins: [
      dts({
        insertTypesEntry: true,
        rollupTypes: true,
      }),
    ],
    optimizeDeps: {
      exclude: ["pocketbase-tools"],
    },
    // 开发环境配置
    ...(mode === "development" && {
      define: {
        __DEV__: true,
      },
    }),
  };
});
