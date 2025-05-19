import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarActividadesComponent } from './editar-actividades.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarActividadesComponent', () => {
  let component: EditarActividadesComponent;
  let fixture: ComponentFixture<EditarActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarActividadesComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, data: {} },
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

    fixture = TestBed.createComponent(EditarActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
