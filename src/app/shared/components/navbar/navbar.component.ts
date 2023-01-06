import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" *ngFor="let item of items">
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
  items = [
    { title: 'Home', url: '/' },
    { title: 'Sign In', url: '/auth/signin' },
    { title: 'Sign Up', url: '/auth/signup' },
  ];

  constructor(
    public readonly route: ActivatedRoute, // todo
  ) {
  }
}
