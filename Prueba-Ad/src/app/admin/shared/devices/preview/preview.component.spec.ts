import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicePreviewComponent } from './preview.component';

describe('DevicePreviewComponent', () => {
  let component: DevicePreviewComponent;
  let fixture: ComponentFixture<DevicePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
