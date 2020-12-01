import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleconsultComponent } from './teleconsult.component';

describe('TeleconsultComponent', () => {
  let component: TeleconsultComponent;
  let fixture: ComponentFixture<TeleconsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeleconsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleconsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
