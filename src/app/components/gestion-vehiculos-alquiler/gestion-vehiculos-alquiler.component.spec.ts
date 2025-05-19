import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionVehiculosAlquilerComponent } from './gestion-vehiculos-alquiler.component';

describe('GestionVehiculosAlquilerComponent', () => {
  let component: GestionVehiculosAlquilerComponent;
  let fixture: ComponentFixture<GestionVehiculosAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVehiculosAlquilerComponent, HttpClientTestingModule]
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
