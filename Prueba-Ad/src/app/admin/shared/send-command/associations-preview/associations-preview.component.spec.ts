import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCommandAssociationsPreviewComponent } from './associations-preview.component';

describe('SendCommandAssociationsPreviewComponent', () => {
  let component: SendCommandAssociationsPreviewComponent;
  let fixture: ComponentFixture<SendCommandAssociationsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCommandAssociationsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCommandAssociationsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
