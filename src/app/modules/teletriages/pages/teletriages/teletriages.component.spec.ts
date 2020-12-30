import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeletriagesComponent } from './teletriages.component';

describe('TeletriagesComponent', () => {
  let component: TeletriagesComponent;
  let fixture: ComponentFixture<TeletriagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeletriagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeletriagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
