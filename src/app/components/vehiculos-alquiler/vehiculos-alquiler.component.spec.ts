import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosAlquilerComponent } from './vehiculos-alquiler.component';

describe('VehiculosAlquilerComponent', () => {
  let component: VehiculosAlquilerComponent;
  let fixture: ComponentFixture<VehiculosAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosAlquilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
