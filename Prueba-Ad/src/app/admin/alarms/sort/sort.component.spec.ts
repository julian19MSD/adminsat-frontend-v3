import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AlarmSortComponent} from './sort.component';


describe('AlarmSortComponent', () => {
  let component: AlarmSortComponent;
  let fixture: ComponentFixture<AlarmSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmSortComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
