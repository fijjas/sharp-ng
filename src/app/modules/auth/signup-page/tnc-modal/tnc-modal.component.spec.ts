import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TncModalComponent } from './tnc-modal.component';

describe('TncModalComponent', () => {
  let component: TncModalComponent;
  let fixture: ComponentFixture<TncModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TncModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TncModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
