import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsListContainer } from './list.container';

describe('InstallationsListContainer', () => {
  let component: InstallationsListContainer;
  let fixture: ComponentFixture<InstallationsListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
