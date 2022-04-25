import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAssociationPreviewComponent } from './simple-association-preview.component';

describe('SimpleAssociationPreviewComponent', () => {
  let component: SimpleAssociationPreviewComponent;
  let fixture: ComponentFixture<SimpleAssociationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAssociationPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAssociationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
