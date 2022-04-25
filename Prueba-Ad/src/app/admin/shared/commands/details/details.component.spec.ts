import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsDetailsComponent } from './details.component';

describe('CommandsDetailsComponent', () => {
  let component: CommandsDetailsComponent;
  let fixture: ComponentFixture<CommandsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
