import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAssociationsPreviewComponent } from './associations-preview.component';

describe('AssociationsPreviewComponent', () => {
  let component: DeviceAssociationsPreviewComponent;
  let fixture: ComponentFixture<DeviceAssociationsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceAssociationsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAssociationsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
