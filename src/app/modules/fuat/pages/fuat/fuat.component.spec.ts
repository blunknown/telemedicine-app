import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuatComponent } from './fuat.component';

describe('FuatComponent', () => {
  let component: FuatComponent;
  let fixture: ComponentFixture<FuatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
