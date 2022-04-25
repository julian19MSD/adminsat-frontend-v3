import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsItemComponent } from './installations-item.component';

describe('InstallationsItemComponent', () => {
  let component: InstallationsItemComponent;
  let fixture: ComponentFixture<InstallationsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallationsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
