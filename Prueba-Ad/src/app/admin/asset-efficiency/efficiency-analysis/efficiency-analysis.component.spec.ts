import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalysisEfficiencyComponent } from './efficiency-analysis.component';



describe('AnalysisEfficiencyComponent', () => {
  let component: AnalysisEfficiencyComponent;
  let fixture: ComponentFixture<AnalysisEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisEfficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
