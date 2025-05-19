import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarVehiculoComponent } from './editar-vehiculo.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarVehiculoComponent', () => {
  let component: EditarVehiculoComponent;
  let fixture: ComponentFixture<EditarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVehiculoComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              data: {},
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '1'; // o el valor que quieras testear
                  return null;
                }
              }
            },
            params: of({}),
            data: of({}),
            queryParams: of({}),
            parent: null,
            firstChild: null
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
