import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, tap } from 'rxjs';

interface INavbarItem {
  title: string;
  url: string;
  protected?: boolean;
}

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" *ngFor="let item of activeItems">
            <a class="nav-link" [routerLink]="item.url">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `a { color: black; &:hover,&:active { color: #333; } }`,
  ],
})
export class NavbarComponent {
  activeItems: INavbarItem[] = [];

  private readonly items: INavbarItem[] = [
    { title: 'Home', url: '/' },
    { title: 'Sign In', url: '/auth/signin' },
    { title: 'Sign Up', url: '/auth/signup' },
    { title: 'Dashboard', url: '/dashboard', protected: true },
  ];

  constructor(
    public readonly route: ActivatedRoute,
    private readonly authService: AuthService,
  ) {
    this.rebuildItemList();
    this.authService.bearerToken$.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      tap(() => this.rebuildItemList())
    ).subscribe();
  }

  private rebuildItemList(): void {
    const isAuthenticated = !!this.authService.bearerToken$.value;
    this.activeItems = this.items.filter(item => !item.protected || isAuthenticated);
  }
}
