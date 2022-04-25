import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCommandComponent } from './custom-command.component';

describe('CustomCommandComponent', () => {
  let component: CustomCommandComponent;
  let fixture: ComponentFixture<CustomCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
