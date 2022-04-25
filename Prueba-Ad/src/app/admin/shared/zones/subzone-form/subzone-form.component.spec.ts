import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubzonesCreateComponent } from './subzone-form.component';

describe('SubzonesCreateComponent', () => {
  let component: SubzonesCreateComponent;
  let fixture: ComponentFixture<SubzonesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubzonesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubzonesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
