import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsFilterComponent } from './filter.component';

describe('InstallationsFilterComponent', () => {
  let component: InstallationsFilterComponent;
  let fixture: ComponentFixture<InstallationsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
