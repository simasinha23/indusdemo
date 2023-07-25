import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usecase1Component } from './usecase1.component';

describe('Usecase1Component', () => {
  let component: Usecase1Component;
  let fixture: ComponentFixture<Usecase1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Usecase1Component]
    });
    fixture = TestBed.createComponent(Usecase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
