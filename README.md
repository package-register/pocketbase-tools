# PocketBase Tools

一个用于 PocketBase 的 TypeScript 工具库，提供完整的客户端管理、服务操作和类型定义。

## 🚀 特性

- ✅ **完整的导出管理** - 所有模块都已正确导出
- ✅ **TypeScript 支持** - 完整的类型定义
- ✅ **代码格式化** - 自动格式化和代码质量检查
- ✅ **生产环境优化** - 代码混淆和压缩
- ✅ **多格式支持** - ESM 和 CommonJS 双格式输出

## 📦 安装

```bash
npm install pocketbase-tools
# 或
yarn add pocketbase-tools
# 或
bun add pocketbase-tools
```

## 🛠️ 开发脚本

### 构建相关

```bash
# 开发环境构建（未压缩，包含 source map）
bun run build:dev

# 生产环境构建（压缩混淆，移除 console）
bun run build:prod

# 默认构建（等同于 build:prod）
bun run build
```

### 代码质量

```bash
# 格式化所有代码
bun run format

# 检查代码格式
bun run format:check
```

### 其他

```bash
# 生成文档
bun run docs

# 运行测试
bun run test

# 监听测试
bun run test:watch

# 安装依赖
bun run setup
```

## 📁 项目结构

```
src/
├── base/           # 基础客户端和设置
│   ├── client.ts   # PocketBase 客户端管理
│   └── setup.ts    # 集合预设置
├── services/       # 业务服务
│   ├── auth.action.ts     # 认证服务
│   ├── product.action.ts  # 产品服务
│   ├── profile.action.ts  # 配置文件服务
│   └── user.action.ts     # 用户服务
├── types/          # 类型定义
│   ├── index.ts           # 类型导出
│   ├── product.types.ts   # 产品类型
│   ├── profile.types.ts   # 配置文件类型
│   └── user.types.ts      # 用户类型
├── utils/          # 工具函数
│   ├── index.ts           # 工具导出
│   ├── env.ts             # 环境变量处理
│   ├── errorHandler.ts    # 错误处理
│   ├── logger.ts          # 日志工具
│   └── useFiles.ts        # 文件处理
└── index.ts        # 主入口文件
```

## 🔧 配置文件

### Prettier 配置 (`.prettierrc`)

- 使用双引号
- 2 空格缩进
- 行宽 80 字符
- 尾随逗号

### ESLint 配置 (`.eslintrc.js`)

- TypeScript 支持
- 推荐规则集
- 自定义代码风格规则

### Vite 配置 (`vite.config.ts`)

- 开发/生产环境区分
- 生产环境代码混淆和压缩
- 自动生成类型声明文件
- Source map 支持

## 📤 导出内容

### 基础模块

```typescript
import { usePBClient, resetPBInstances } from "pocketbase-tools";
import {
  getCollect,
  userCollect,
  productCollect,
  profileCollect,
} from "pocketbase-tools";
import pb from "pocketbase-tools";
```

### 服务模块

```typescript
import {
  // 认证服务
  useAuth,

  // 产品服务
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,

  // 用户服务
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,

  // 配置文件服务
  listAllCompanyProfiles,
  addCompanyProfile,
  updateCompanyProfile,
  deleteCompanyProfile,
} from "pocketbase-tools";
```

### 类型定义

```typescript
import {
  User,
  UserCreate,
  UserUpdate,
  Product,
  ProfileCollection,
} from "pocketbase-tools";
```

### 工具函数

```typescript
import {
  getEnvVar,
  validateEnvVars,
  withErrorHandling,
  logger,
} from "pocketbase-tools";
```

## 🎯 使用示例

```typescript
import { usePBClient, getAllUsers, logger } from "pocketbase-tools";

// 初始化客户端
const pb = usePBClient({
  url: "http://localhost:8090",
});

// 或者使用默认的
import pb from "pocketbase-tools";

// 使用服务
const users = await getAllUsers();
logger.success("获取用户列表成功", users);
```

- 文件获取

```js
import { filesCollect } from "pocketbase-tools";

// 获取最新的文件记录
const [record] = await filesCollect.getFullList({
    sort: '-created',
    limit: 1,
});
// 获取文件信息
console.log(useFiles.getAbsoluteURL(record, record?.file))
```

## 🔄 发布流程

项目配置了 `prepack` 钩子，在发布前会自动执行生产环境构建：

```bash
npm publish
# 会自动执行: bun run build:prod
```

## 📝 开发注意事项

1. **代码提交前**：运行 `bun run format` 确保代码格式正确
2. **构建测试**：使用 `bun run build:prod` 测试生产环境构建
3. **类型检查**：确保所有导出都有正确的类型定义
4. **文档更新**：新增功能时更新 README 和类型注释

## 📄 许可证

MIT License
