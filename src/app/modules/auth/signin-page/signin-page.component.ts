import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionsService } from '../../../shared/services/api/sessions.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ICreateSession, ISession } from '../../../shared/services/api/models';
import { catchError, mergeMap, of, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {
  signinError: string|null = null;

  readonly formGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private readonly sessionsService: SessionsService,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
      tap(() => { this.signinError = null; })
    ).subscribe();
  }

  signin(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.sessionsService.login(this.formGroup.value as unknown as ICreateSession).pipe(
      untilDestroyed(this),
      tap((sess: ISession) => {
        this.authService.bearerToken$.next(sess.id_token);
      }),
      mergeMap(() => this.router.navigate(['/dashboard'])),
      catchError((e) => {
        this.signinError = e.message;
        return of(null);
      })
    ).subscribe();
  }
}
