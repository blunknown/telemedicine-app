import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeletriageComponent } from './details-teletriage.component';

describe('DetailsTeletriageComponent', () => {
  let component: DetailsTeletriageComponent;
  let fixture: ComponentFixture<DetailsTeletriageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTeletriageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTeletriageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
