import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltyFilterComponent } from './filter.component';

describe('NoveltyFilterComponent', () => {
  let component: NoveltyFilterComponent;
  let fixture: ComponentFixture<NoveltyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
