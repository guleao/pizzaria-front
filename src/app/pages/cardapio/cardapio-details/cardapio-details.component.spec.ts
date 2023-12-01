import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioDetailsComponent } from './cardapio-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardapioDetailsComponent', () => {
  let component: CardapioDetailsComponent;
  let fixture: ComponentFixture<CardapioDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardapioDetailsComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CardapioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
