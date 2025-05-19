import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FooterComponent } from './footer.component';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { root: { firstChild: { snapshot: { data: {} } } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar las columnas principales', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer-column')).toBeTruthy();
    expect(compiled.textContent).toContain('Nuestras redes');
    expect(compiled.textContent).toContain('Nuestros destinos');
    expect(compiled.textContent).toContain('Nuestras Actividades');
    expect(compiled.textContent).toContain('Soporte');
  });

  it('debe tener enlaces de redes sociales', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Instagram');
    expect(compiled.textContent).toContain('Twitter');
    expect(compiled.textContent).toContain('Facebook');
  });

  it('debe tener enlaces de destinos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('España');
    expect(compiled.textContent).toContain('Andorra');
    expect(compiled.textContent).toContain('Francia');
    expect(compiled.textContent).toContain('Reino Unido');
    expect(compiled.textContent).toContain('Alemania');
    expect(compiled.textContent).toContain('Italia');
  });

  it('debe tener enlaces de actividades', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Escalada');
    expect(compiled.textContent).toContain('Rutas senderismo');
    expect(compiled.textContent).toContain('Rafting');
    expect(compiled.textContent).toContain('Kayak');
    expect(compiled.textContent).toContain('Rutas en bici');
    expect(compiled.textContent).toContain('Esquí / Snowboard');
    expect(compiled.textContent).toContain('Paseos en helicóptero');
  });

  it('debe tener enlaces de soporte', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Contacta con nosotros');
    expect(compiled.textContent).toContain('Política de privacidad');
    expect(compiled.textContent).toContain('Preguntas frecuentes');
  });
});
