import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCommandPreviewComponent } from './preview.component';

describe('SendCommandPreviewComponent', () => {
  let component: SendCommandPreviewComponent;
  let fixture: ComponentFixture<SendCommandPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCommandPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCommandPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
