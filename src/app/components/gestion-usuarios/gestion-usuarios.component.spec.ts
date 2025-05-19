import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('GestionUsuariosComponent', () => {
  let component: GestionUsuariosComponent;
  let fixture: ComponentFixture<GestionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GestionUsuariosComponent,
        HttpClientTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
