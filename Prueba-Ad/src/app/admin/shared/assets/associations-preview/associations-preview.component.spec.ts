import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsPreviewComponent } from './associations-preview.component';

describe('AssociationsPreviewComponent', () => {
  let component: AssociationsPreviewComponent;
  let fixture: ComponentFixture<AssociationsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
