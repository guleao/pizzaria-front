import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaboresDetailsComponent } from './sabores-details.component';

describe('SaboresDetailsComponent', () => {
  let component: SaboresDetailsComponent;
  let fixture: ComponentFixture<SaboresDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaboresDetailsComponent]
    });
    fixture = TestBed.createComponent(SaboresDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
