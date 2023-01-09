import { Injectable } from '@angular/core';
import { ApiBase } from './api-base';
import { HttpClient } from '@angular/common/http';
import { ICreateSession, ISession } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService extends ApiBase<ISession>{
  constructor(
    httpClient: HttpClient,
  ) {
    super(httpClient, '/sessions');
  }

  login(data: ICreateSession): Observable<ISession> {
    return this.httpClient.post(this.url('/create'), data) as Observable<ISession>;
  }
}
