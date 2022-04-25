import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericContentPlaceholderComponent } from './generic-content-placeholder.component';

describe('DummyTabsComponent', () => {
  let component: GenericContentPlaceholderComponent;
  let fixture: ComponentFixture<GenericContentPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericContentPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericContentPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
