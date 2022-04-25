import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandsSortComponent } from './sort.component';

describe('CommandsSortComponent', () => {
  let component: CommandsSortComponent;
  let fixture: ComponentFixture<CommandsSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandsSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandsSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
