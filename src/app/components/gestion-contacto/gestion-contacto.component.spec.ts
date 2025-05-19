import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionContactoComponent } from './gestion-contacto.component';

describe('GestionContactoComponent', () => {
  let component: GestionContactoComponent;
  let fixture: ComponentFixture<GestionContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionContactoComponent, HttpClientTestingModule] // <-- Añade HttpClientTestingModule aquí
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
