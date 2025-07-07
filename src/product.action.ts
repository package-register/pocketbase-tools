import { productCollect } from "./base";
import type { Product } from "./types/product.types";
import { withErrorHandling } from "./utils/errorHandler";
import { logger } from "./utils/logger";

function toProduct(record: any): Product {
  return {
    id: record.id,
    title: record.title,
    desc: record.desc,
    img: record.img,
    video: record.video,
    addtime: record.addtime,
    created: record.created,
    updated: record.updated,
  };
}

/**
 * 添加产品
 */
export async function addProduct(
  titleOrProduct: string | Partial<Product>,
  desc?: string,
  img?: string,
  video?: string,
): Promise<Product | null> {
  return withErrorHandling("添加产品", async () => {
    let productData: Partial<Product>;
    if (typeof titleOrProduct === "object") {
      productData = titleOrProduct;
    } else {
      productData = {
        title: titleOrProduct,
        desc: desc || "",
        img: img || "",
        video: video || "",
        addtime: new Date().toISOString(),
      };
    }
    const result = await productCollect.create(productData);
    logger.success("添加产品成功", result);
    return toProduct(result);
  });
}

/**
 * 更新产品
 */
export async function updateProduct(
  id: string,
  updatedFields: Partial<Product>,
): Promise<Product | null> {
  return withErrorHandling(`更新产品 (ID: ${id})`, async () => {
    const updatedRecord = await productCollect.update(id, updatedFields);
    logger.success(`产品更新成功: ${updatedRecord.title}`);
    return toProduct(updatedRecord);
  });
}

/**
 * 创建 products 表结构
 */
export async function createProductsCollection() {
  return withErrorHandling("创建 products 表", async () => {
    const collection = await productCollect.client.collections.create({
      name: "products",
      type: "base",
      listRule: null,
      viewRule: null,
      createRule: "",
      updateRule: "",
      deleteRule: "",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "desc",
          type: "text",
          required: false,
        },
        {
          name: "images",
          type: "file",
          required: false,
          maxSelect: 5,
          maxSize: 5 * 1024 * 1024,
          mimeTypes: [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/webp",
            "application/octet-stream",
          ],
          protected: true,
        },
        {
          name: "video",
          type: "file",
          required: false,
          maxSelect: 1,
          maxSize: 100 * 1024 * 1024,
          mimeTypes: ["video/mp4", "video/gif"],
          protected: true,
        },
        {
          name: "addtime",
          type: "date",
          required: false,
        },
      ],
    });
    logger.success("products 表创建成功", collection);
    return collection;
  });
}

/**
 * 删除产品
 */
export async function deleteProduct(id: string): Promise<boolean | null> {
  return withErrorHandling(`删除产品 (ID: ${id})`, async () => {
    await productCollect.delete(id);
    logger.success(`产品删除成功: ${id}`);
    return true;
  });
}

/**
 * 获取所有产品
 */
export async function getAllProducts(options?: {
  filter?: string;
  sort?: string;
  expand?: string[];
}): Promise<Product[] | null> {
  return withErrorHandling("获取所有产品列表", async () => {
    const records = await productCollect.getFullList({
      filter: options?.filter,
      sort: options?.sort || undefined,
      expand: options?.expand?.join(","),
    });
    logger.success(`成功获取到 ${records.length} 个产品`);
    return records.map(toProduct);
  });
}

/**
 * 获取单个产品 by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  return withErrorHandling(`获取产品详情 (ID: ${id})`, async () => {
    const record = await productCollect.getOne(id);
    logger.success(`成功获取产品: ${record.title}`);
    return toProduct(record);
  });
}
