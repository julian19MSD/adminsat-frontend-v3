import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltyItemComponent } from './novelty-item.component';

describe('NoveltyItemComponent', () => {
  let component: NoveltyItemComponent;
  let fixture: ComponentFixture<NoveltyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
