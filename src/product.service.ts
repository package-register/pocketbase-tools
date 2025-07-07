import type { Product } from "./types/product.types";

export interface ProductService {
  addProduct(
    titleOrProduct: string | Partial<Product>,
    desc?: string,
    img?: string,
    video?: string,
  ): Promise<Product | null>;
  updateProduct(
    id: string,
    updatedFields: Partial<Product>,
  ): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  createProductsCollection(): Promise<any>;
  getAllProducts(options?: {
    filter?: string;
    sort?: string;
    expand?: string[];
  }): Promise<Product[] | null>;
  getProductById(id: string): Promise<Product | null>;
}

export * from "./product.action";
