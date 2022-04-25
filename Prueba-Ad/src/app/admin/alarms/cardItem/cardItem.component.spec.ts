import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmCardItemComponent } from './cardItem.component';

describe('AlarmCardComponent', () => {
  let component: AlarmCardItemComponent;
  let fixture: ComponentFixture<AlarmCardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmCardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
