import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceDetailsComponent } from './details.component';

describe('PermanenceDetailsComponent', () => {
  let component: PermanenceDetailsComponent;
  let fixture: ComponentFixture<PermanenceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
