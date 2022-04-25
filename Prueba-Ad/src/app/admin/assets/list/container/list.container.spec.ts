import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsListContainer } from './list.container';

describe('AssetsCrudComponent', () => {
  let component: AssetsListContainer;
  let fixture: ComponentFixture<AssetsListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
