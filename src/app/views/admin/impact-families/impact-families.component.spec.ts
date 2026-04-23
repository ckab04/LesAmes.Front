import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactFamiliesComponent } from './impact-families.component';

describe('ImpactFamiliesComponent', () => {
  let component: ImpactFamiliesComponent;
  let fixture: ComponentFixture<ImpactFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpactFamiliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
