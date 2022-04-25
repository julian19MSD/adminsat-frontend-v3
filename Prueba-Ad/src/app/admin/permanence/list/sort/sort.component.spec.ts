import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanenceSortComponent } from './sort.component';

describe('PermanenceSortComponent', () => {
  let component: PermanenceSortComponent;
  let fixture: ComponentFixture<PermanenceSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanenceSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanenceSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
