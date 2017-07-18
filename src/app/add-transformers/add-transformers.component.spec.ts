import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutobotsComponent } from './add-transformers.component';

describe('AddAutobotsComponent', () => {
  let component: AddAutobotsComponent;
  let fixture: ComponentFixture<AddAutobotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAutobotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
