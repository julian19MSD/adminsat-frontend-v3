import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviasTwitterDialogComponent } from './invias-twitter.component';

describe('InviasTwitterDialogComponent', () => {
  let component: InviasTwitterDialogComponent;
  let fixture: ComponentFixture<InviasTwitterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviasTwitterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviasTwitterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
