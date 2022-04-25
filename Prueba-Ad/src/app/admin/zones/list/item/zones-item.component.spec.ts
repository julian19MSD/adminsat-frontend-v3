import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesItemComponent } from './zones-item.component';

describe('ZonesItemComponent', () => {
  let component: ZonesItemComponent;
  let fixture: ComponentFixture<ZonesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
