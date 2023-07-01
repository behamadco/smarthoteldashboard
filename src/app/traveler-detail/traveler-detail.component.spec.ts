import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerDetailComponent } from './traveler-detail.component';

describe('TravelerDetailComponent', () => {
  let component: TravelerDetailComponent;
  let fixture: ComponentFixture<TravelerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
