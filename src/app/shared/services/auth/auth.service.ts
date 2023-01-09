import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  bearerToken: string|null = null;

  constructor() { }
}
