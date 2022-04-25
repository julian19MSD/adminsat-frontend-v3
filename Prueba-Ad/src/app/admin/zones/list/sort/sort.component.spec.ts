import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonesSortComponent } from './sort.component';

describe('ZonesSortComponent', () => {
  let component: ZonesSortComponent;
  let fixture: ComponentFixture<ZonesSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonesSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
