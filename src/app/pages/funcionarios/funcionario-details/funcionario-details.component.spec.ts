import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioDetailsComponent } from './funcionario-details.component';

describe('FuncionarioDetailsComponent', () => {
  let component: FuncionarioDetailsComponent;
  let fixture: ComponentFixture<FuncionarioDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FuncionarioDetailsComponent]
    });
    fixture = TestBed.createComponent(FuncionarioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
