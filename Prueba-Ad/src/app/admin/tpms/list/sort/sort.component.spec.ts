import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpmsSortComponent } from './sort.component';

describe('TpmsSortComponent', () => {
  let component: TpmsSortComponent;
  let fixture: ComponentFixture<TpmsSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmsSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpmsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
