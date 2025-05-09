import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVehiculosAlquilerComponent } from './gestion-vehiculos-alquiler.component';

describe('GestionVehiculosAlquilerComponent', () => {
  let component: GestionVehiculosAlquilerComponent;
  let fixture: ComponentFixture<GestionVehiculosAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVehiculosAlquilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionVehiculosAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
