import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeletryComponent } from './teletry.component';

describe('TeletryComponent', () => {
  let component: TeletryComponent;
  let fixture: ComponentFixture<TeletryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeletryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeletryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
