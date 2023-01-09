import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';
import { HttpClient } from '@angular/common/http';
import { ICreateUser, ISession, IUser } from './models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService extends ApiBase<IUser> {
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, '/users');
  }

  register(data: ICreateUser): Observable<ISession> {
    return this.httpClient.post(this.url(''), data) as Observable<ISession>;
  }
}
