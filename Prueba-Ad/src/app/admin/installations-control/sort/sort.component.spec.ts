import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsControlSortComponent } from './sort.component';

describe('InstallationsControlSortComponent', () => {
  let component: InstallationsControlSortComponent;
  let fixture: ComponentFixture<InstallationsControlSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsControlSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsControlSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
