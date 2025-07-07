export interface AuthStrategy {
  authenticate(email: string, password: string): Promise<any>;
  refreshToken(): Promise<any>;
  logout(): Promise<void>;
}

export class DefaultAuthStrategy implements AuthStrategy {
  private client: any;
  private collection: string;

  constructor(client: any, collection: string = "users") {
    this.client = client;
    this.collection = collection;
  }

  async authenticate(email: string, password: string): Promise<any> {
    return await this.client
      .collection(this.collection)
      .authWithPassword(email, password);
  }

  async refreshToken(): Promise<any> {
    return await this.client.collection(this.collection).authRefresh();
  }

  async logout(): Promise<void> {
    this.client.authStore.clear();
  }
}
