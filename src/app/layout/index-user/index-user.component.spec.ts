import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexUserComponent } from './index-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('IndexUserComponent', () => {
  let component: IndexUserComponent;
  let fixture: ComponentFixture<IndexUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexUserComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(IndexUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
