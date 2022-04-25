import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsFilterComponent } from './filter.component';

describe('CommandsFilterComponent', () => {
  let component: CommandsFilterComponent;
  let fixture: ComponentFixture<CommandsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
