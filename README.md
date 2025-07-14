# pocketbase-tools

## Introduction

A TypeScript toolkit for PocketBase, providing services for managing users, products, and company profiles.

## Installation

You can install `pocketbase-tools` using npm or Bun:

```shell
npm install pocketbase-tools
# or
bun add pocketbase-tools
```

## Publish

To publish the package, follow these steps:

1. Rebuild the project:

    ```shell
    rm -rf dist && bun run build
    ```

2. Publish the package (use `--access public` if it's your first time publishing):

    ```shell
    npm publish --access public
    ```

## Quick Start

### Importing

```ts
import pb, {
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
  loginAdmin,
  loginUser,
  useFiles,
} from "pocketbase-tools";
```

### User Operations

```ts
// Add a user
await addUser({ email: "test@xx.com", name: "test" });

// Get all users
const users = await getAllUsers();

// Update a user
await updateUser(users[0].id, { name: "updated name" });

// Delete a user
await deleteUser(users[0].id);
```

### Product Operations

```ts
// Add a product
await addProduct({ title: "New Product" });

// Get all products
const products = await getAllProducts();

// Get a product by ID
const product = await getProductById(products[0].id);

// Update a product
await updateProduct(products[0].id, { title: "Updated Product" });

// Delete a product
await deleteProduct(products[0].id);
```

### Profile Operations

```ts
// Add a company profile
const record = await addCompanyProfile({
  companyName: "MyCo",
  contactEmail: "c@c.com",
  contactPhone: "123",
  companyAddress: "Address",
  allowRegistration: true,
});

// List all company profiles
const profiles = await listAllCompanyProfiles();

// Update a company profile
await updateCompanyProfile(profiles[0].id, { companyName: "Updated Co" });

// Delete a company profile
await deleteCompanyProfile(profiles[0].id);
```

### Authentication

```ts
// Admin login
await loginAdmin({ email: "admin@xx.com", password: "yourpass" });

// User login
await loginUser({ username: "test@xx.com", password: "yourpass" });

// Logout
await logout();

// Refresh token
await refresh("admin");
await refresh("user");
```

### File Utilities

```ts
// Get file URL and token
const [fileUrl, token] = await useFiles.getCollectionURL(
  record.collectionName,
  "file.jpg"
);
```

## License

This project is licensed under the `MIT` License.
