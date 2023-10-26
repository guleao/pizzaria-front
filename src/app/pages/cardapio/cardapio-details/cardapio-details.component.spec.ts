import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioDetailsComponent } from './cardapio-details.component';

describe('CardapioDetailsComponent', () => {
  let component: CardapioDetailsComponent;
  let fixture: ComponentFixture<CardapioDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardapioDetailsComponent]
    });
    fixture = TestBed.createComponent(CardapioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
