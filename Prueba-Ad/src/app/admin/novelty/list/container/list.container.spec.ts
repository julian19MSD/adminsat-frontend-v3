import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltyComponent } from './list.container';

describe('NoveltyComponent', () => {
  let component: NoveltyComponent;
  let fixture: ComponentFixture<NoveltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
