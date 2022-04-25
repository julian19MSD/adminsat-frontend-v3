import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesFilterComponent } from './filter.component';

describe('ZonesFilterComponent', () => {
  let component: ZonesFilterComponent;
  let fixture: ComponentFixture<ZonesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
