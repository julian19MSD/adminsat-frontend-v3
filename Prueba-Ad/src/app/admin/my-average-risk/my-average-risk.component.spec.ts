import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAverageRiskComponent } from './my-average-risk.component';

describe('MyAverageRiskComponent', () => {
  let component: MyAverageRiskComponent;
  let fixture: ComponentFixture<MyAverageRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAverageRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAverageRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
