import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar los componentes hijos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-gestion-contacto')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-usuarios')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-actividades')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-alojamientos')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-tipos-actividades')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-roles')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-destinos')).toBeTruthy();
    expect(compiled.querySelector('app-gestion-vehiculos-alquiler')).toBeTruthy();
  });
});
