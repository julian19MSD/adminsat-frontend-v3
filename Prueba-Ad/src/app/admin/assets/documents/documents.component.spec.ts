import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AssetDocumentsCreateComponent} from './documents.component';


describe('AssetDocumentsCreateComponent', () => {
  let component: AssetDocumentsCreateComponent;
  let fixture: ComponentFixture<AssetDocumentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetDocumentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDocumentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
