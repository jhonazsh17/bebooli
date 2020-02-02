import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklinkComponent } from './booklink.component';

describe('BooklinkComponent', () => {
  let component: BooklinkComponent;
  let fixture: ComponentFixture<BooklinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooklinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
