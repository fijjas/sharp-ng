import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TncModalComponent } from './tnc-modal/tnc-modal.component';
import { UsersService } from '../../../shared/services/api/users.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ICreateUser, ISession } from '../../../shared/services/api/models';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  signupError: string|null = null;

  readonly formGroup = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(32),
    ]),
  });

  constructor(
    private readonly modalService: NgbModal,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.formGroup.valueChanges.pipe(
      untilDestroyed(this),
      tap(() => {
        if (this.signupError) {
          this.signupError = null;
        }
      })
    ).subscribe();
  }

  signup(): void {
    if (this.formGroup.invalid || !!this.authService.bearerToken$.value) {
      return;
    }
    this.usersService.register(this.formGroup.value as unknown as ICreateUser).pipe(
      tap((sess: ISession) => {
        this.authService.bearerToken$.next(sess.id_token);
        this.formGroup.reset();
      }),
      mergeMap(() => this.router.navigate(['/dashboard'])),
      catchError((e) => {
        this.signupError = e.message;
        return of(null);
      }),
    ).subscribe();
  }

  showTnCModal($event: Event): void {
    $event.preventDefault();
    this.modalService.open(TncModalComponent);
  }
}
