import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapReportsContainer } from './map-reports.component';

describe('MapReportsContainer', () => {
  let component: MapReportsContainer;
  let fixture: ComponentFixture<MapReportsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapReportsContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapReportsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
