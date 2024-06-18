import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExpendPage } from './add-expend.page';

describe('AddExpendPage', () => {
  let component: AddExpendPage;
  let fixture: ComponentFixture<AddExpendPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
