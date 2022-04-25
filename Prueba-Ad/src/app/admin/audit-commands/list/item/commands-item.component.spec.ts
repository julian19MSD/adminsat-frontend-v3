import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsItemComponent } from './commands-item.component';

describe('CommandsItemComponent', () => {
  let component: CommandsItemComponent;
  let fixture: ComponentFixture<CommandsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
