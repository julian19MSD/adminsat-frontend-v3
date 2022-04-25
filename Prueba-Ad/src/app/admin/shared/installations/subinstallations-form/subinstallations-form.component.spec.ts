import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubinstallationsCreateComponent } from './subinstallations-form.component';

describe('SubinstallationsCreateComponent', () => {
  let component: SubinstallationsCreateComponent;
  let fixture: ComponentFixture<SubinstallationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubinstallationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubinstallationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
