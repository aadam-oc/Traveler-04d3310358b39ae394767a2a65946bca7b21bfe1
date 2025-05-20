import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PoliticaPrivacidadComponent } from './politica-privacidad.component';

describe('PoliticaPrivacidadComponent', () => {
  let component: PoliticaPrivacidadComponent;
  let fixture: ComponentFixture<PoliticaPrivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticaPrivacidadComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticaPrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el título de la política', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Política de Privacidad');
  });

  it('debe mostrar las secciones principales', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Información que Recopilamos');
    expect(compiled.textContent).toContain('Uso de la Información');
    expect(compiled.textContent).toContain('Compartición de Datos');
    expect(compiled.textContent).toContain('Seguridad de los Datos');
    expect(compiled.textContent).toContain('Tus Derechos');
    expect(compiled.textContent).toContain('Cambios en la Política de Privacidad');
    expect(compiled.textContent).toContain('Contacto');
  });

  it('debe mostrar la información de contacto', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('traveler@support.traveler.com');
    expect(compiled.textContent).toContain('Carrer de Monlau 6 08027');
  });
});
