import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwedenComponent } from './sweden.component';

describe('SwedenComponent', () => {
  let component: SwedenComponent;
  let fixture: ComponentFixture<SwedenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwedenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
