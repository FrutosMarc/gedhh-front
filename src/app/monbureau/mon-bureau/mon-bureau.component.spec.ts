import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonBureauComponent } from './mon-bureau.component';

describe('MonBureauComponent', () => {
  let component: MonBureauComponent;
  let fixture: ComponentFixture<MonBureauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonBureauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
