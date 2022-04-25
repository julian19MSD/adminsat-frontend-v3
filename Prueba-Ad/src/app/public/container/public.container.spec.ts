import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicContainer } from './public.container';

describe('PublicComponent', () => {
  let component: PublicContainer;
  let fixture: ComponentFixture<PublicContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
