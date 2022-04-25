import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFilterComponent } from './filter.component';

describe('AssetFilterComponent', () => {
  let component: AssetFilterComponent;
  let fixture: ComponentFixture<AssetFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
