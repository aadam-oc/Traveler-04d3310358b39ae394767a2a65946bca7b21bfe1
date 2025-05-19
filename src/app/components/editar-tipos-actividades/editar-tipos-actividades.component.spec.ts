import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarTiposActividadesComponent } from './editar-tipos-actividades.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarTiposActividadesComponent', () => {
  let component: EditarTiposActividadesComponent;
  let fixture: ComponentFixture<EditarTiposActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTiposActividadesComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}), snapshot: { params: {}, data: {} } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTiposActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
