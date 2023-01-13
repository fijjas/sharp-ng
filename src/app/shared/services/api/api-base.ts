import { HttpClient } from '@angular/common/http';

export abstract class ApiBase<T> {
  private static readonly API_URL = 'http://193.124.114.46:3001';

  protected get baseUrl(): string {
    return `${ApiBase.API_URL}${this.basePath}`;
  }

  protected constructor(
    protected readonly httpClient: HttpClient,
    protected readonly basePath: string,
  ) {
    ApiBase.validatePath(basePath);
  }

  protected url(path: string): string {
    ApiBase.validatePath(path);
    return `${this.baseUrl}${path}`;
  }

  private static validatePath(path: string): void {
    if (path !== '' && (!path.startsWith('/') || path.endsWith('/'))) {
      throw new Error('Invalid path');
    }
  }
}
