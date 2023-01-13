import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class AuthService {
  static readonly LS_KEY = 'auth.bearer';
  readonly bearerToken$ = new BehaviorSubject<string|null>(null);

  constructor() {
    this.bearerToken$.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      tap((val) => {
        if (val) {
          localStorage.setItem(AuthService.LS_KEY, val as string);
        } else {
          localStorage.removeItem(AuthService.LS_KEY);
        }
      })
    ).subscribe();

    const cachedToken = localStorage.getItem(AuthService.LS_KEY);
    if (cachedToken) {
      this.bearerToken$.next(cachedToken);
    }
  }
}
