import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltyCreateComponent } from './form.component';

describe('NoveltyFormComponent', () => {
  let component: NoveltyCreateComponent;
  let fixture: ComponentFixture<NoveltyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoveltyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
