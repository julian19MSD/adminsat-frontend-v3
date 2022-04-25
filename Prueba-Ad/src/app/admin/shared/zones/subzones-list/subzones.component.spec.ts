import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubzonesListComponent } from './subzones.component';

describe('SubzonesListComponent', () => {
  let component: SubzonesListComponent;
  let fixture: ComponentFixture<SubzonesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubzonesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubzonesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
