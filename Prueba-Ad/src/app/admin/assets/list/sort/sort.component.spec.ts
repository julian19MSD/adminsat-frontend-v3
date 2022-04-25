import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSortComponent } from './sort.component';

describe('AssetSortComponent', () => {
  let component: AssetSortComponent;
  let fixture: ComponentFixture<AssetSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
