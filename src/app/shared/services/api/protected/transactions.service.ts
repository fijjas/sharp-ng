import { Injectable } from '@angular/core';
import { ICreateTransaction, ITransaction } from '../models';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ProtectedApiBase } from './protected-api-base';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends ProtectedApiBase<ITransaction> {
  constructor(
    httpClient: HttpClient,
    authService: AuthService,
  ) {
    super(httpClient, '/api/protected/transactions', authService);
  }

  create(data: ICreateTransaction): Observable<ITransaction> {
    return (this.httpClient.post(
      this.url(''),
      data,
      { headers: this.authHeaders }
    ) as Observable<{ trans_token: ITransaction }>).pipe(
      map(d => d.trans_token)
    ) as Observable<ITransaction>;
  }
}
