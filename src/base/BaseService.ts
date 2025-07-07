import PocketBase from "pocketbase";
import { IBaseService } from "../types";
import { ErrorHandler } from "../utils/errorHandler";

export abstract class BaseService implements IBaseService {
  protected client: PocketBase;
  protected collection: string;
  protected errorHandler: ErrorHandler;

  constructor(client: PocketBase, collection: string) {
    this.client = client;
    this.collection = collection;
    this.errorHandler = new ErrorHandler();
  }

  async getById(id: string): Promise<any> {
    try {
      return await this.client.collection(this.collection).getOne(id);
    } catch (error) {
      this.errorHandler.handle(error);
      throw error;
    }
  }

  async getList(page: number = 1, perPage: number = 50): Promise<any> {
    try {
      return await this.client
        .collection(this.collection)
        .getList(page, perPage);
    } catch (error) {
      this.errorHandler.handle(error);
      throw error;
    }
  }

  async create(data: any): Promise<any> {
    try {
      return await this.client.collection(this.collection).create(data);
    } catch (error) {
      this.errorHandler.handle(error);
      throw error;
    }
  }

  async update(id: string, data: any): Promise<any> {
    try {
      return await this.client.collection(this.collection).update(id, data);
    } catch (error) {
      this.errorHandler.handle(error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.client.collection(this.collection).delete(id);
      return true;
    } catch (error) {
      this.errorHandler.handle(error);
      throw error;
    }
  }
}
