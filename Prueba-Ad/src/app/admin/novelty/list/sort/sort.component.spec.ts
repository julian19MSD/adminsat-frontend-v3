import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltySortComponent } from './sort.component';

describe('NoveltySortComponent', () => {
  let component: NoveltySortComponent;
  let fixture: ComponentFixture<NoveltySortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltySortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltySortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
