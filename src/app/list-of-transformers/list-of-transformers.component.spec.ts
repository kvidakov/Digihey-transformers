import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTransformersComponent } from './list-of-transformers.component';

describe('ListOfTransformersComponent', () => {
  let component: ListOfTransformersComponent;
  let fixture: ComponentFixture<ListOfTransformersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfTransformersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTransformersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
