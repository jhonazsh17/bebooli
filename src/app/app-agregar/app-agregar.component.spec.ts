import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAgregarComponent } from './app-agregar.component';

describe('AppAgregarComponent', () => {
  let component: AppAgregarComponent;
  let fixture: ComponentFixture<AppAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
