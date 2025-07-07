# pocketbase-tools

## Introduction

A TypeScript toolkit for PocketBase, featuring a standard service/action/types layered structure. It provides interfaces and implementations for common business logic such as users, products, company profiles, and file utilities, making it suitable for secondary development and engineering extensions.

## Installation

```shell
npm install pocketbase-tools
# or
bun add pocketbase-tools
```

## Directory Structure

```
src/
  base/                # Core features (collections, bootstrap, etc.)
  utils/               # Utilities (logger, errorHandler, useFiles, ...)
  types/               # Type definitions
  user.service.ts      # User service interfaces
  user.action.ts       # User action implementations
  user.auth.ts         # User/Admin authentication
  product.service.ts   # Product service interfaces
  product.action.ts    # Product action implementations
  profile.service.ts   # Company profile service interfaces
  profile.action.ts    # Company profile action implementations
  ...
```

## Quick Start

Import all features from the package root for best DX:

```ts
import {
  pb,
  userCollect,
  productCollect,
  profileCollect,
  superCollect,
  userService,
  productService,
  profileService,
  addUser,
  getAllUsers,
  addProduct,
  getAllProducts,
  addCompanyProfile,
  setAdminAccount,
  loginAdmin,
  loginUser,
  useFiles,
} from "pocketbase-tools"

// Set admin account
setAdminAccount({ email: "admin@xx.com", password: "yourpass" })
await loginAdmin()

// User operations
await addUser({ email: "test@xx.com", name: "test" })
const users = await getAllUsers()

// Product operations
await addProduct({ title: "New Product" })
const products = await getAllProducts()

// Company profile operations
const record = await addCompanyProfile({
  companyName: "MyCo",
  contactEmail: "c@c.com",
  contactPhone: "123",
  companyAddress: "Address",
  allowRegistration: true,
})

// File utilities example
const [fileUrl, token] = await useFiles.getCollectionURL(
  record.collectionName,
  "file.jpg"
)
```

## Type System

All interfaces and data structures are defined in the `src/types/` directory.

## Collection Import Convention

All pb instances and collection instances (such as userCollect, productCollect, profileCollect, etc.) are recommended to be imported directly from the package root.

> ⚠️ `src/base/collections.ts` is deprecated and only kept for legacy compatibility. It will be removed in the future. Do not import from this file.

## Export Details

- Named exports: pb, userCollect, productCollect, profileCollect, superCollect, createPBClient, useFiles, etc.
- Default export: pb (PocketBase client instance).
- It is recommended to always use named imports (`import { ... } from "pocketbase-tools"`). Use `createPBClient` if you need a custom instance.

## Contribution

Issues and PRs are welcome!
