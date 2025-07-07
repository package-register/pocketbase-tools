// Base interfaces for services
export interface IBaseService {
  getById(id: string): Promise<any>;
  getList(page?: number, perPage?: number): Promise<any>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<boolean>;
}

// Common response types
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

// Common error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Configuration types
export interface ClientConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
}

export * from "./product.types";
export * from "./profile.types";
export * from "./user.types";
