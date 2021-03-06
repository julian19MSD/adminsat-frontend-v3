import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContainer } from './dashboard.container';

describe('DashboardComponent', () => {
  let component: DashboardContainer;
  let fixture: ComponentFixture<DashboardContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
