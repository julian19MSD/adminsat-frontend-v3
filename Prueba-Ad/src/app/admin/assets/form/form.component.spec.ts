import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCreateComponent } from './form-create.component';

describe('AssetFormComponent', () => {
  let component: AssetCreateComponent;
  let fixture: ComponentFixture<AssetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
