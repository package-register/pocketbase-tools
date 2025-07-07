export interface Product {
  id: string;
  title: string;
  desc?: string;
  img?: string;
  video?: string;
  addtime?: string;
  created: string;
  updated: string;
}

export interface ProductAction {
  addProduct(product: Partial<Product>): Promise<Product | null>;
  updateProduct(
    id: string,
    updatedFields: Partial<Product>,
  ): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean | null>;
  createProductsCollection(): Promise<any>;
}

export interface ProductService {
  getAllProducts(options?: {
    filter?: string;
    sort?: string;
    expand?: string[];
  }): Promise<Product[] | null>;
  getProductById(id: string): Promise<Product | null>;
}
