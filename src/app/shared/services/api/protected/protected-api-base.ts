import { ApiBase } from '../api-base';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

export class ProtectedApiBase<T> extends ApiBase<T> {
  protected get authHeaders(): Record<string, string> {
    if (!this.authService.bearerToken) {
      throw new Error('Cannot get auth token: unauthorized');
    }
    return { Authorization: `Bearer ${this.authService.bearerToken}` };
  }

  constructor(
    httpClient: HttpClient,
    basePath: string,
    protected readonly authService: AuthService,
  ) {
    super(httpClient, basePath);
  }
}
