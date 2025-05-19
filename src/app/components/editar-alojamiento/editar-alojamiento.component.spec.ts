import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarAlojamientoComponent } from './editar-alojamiento.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarAlojamientoComponent', () => {
  let component: EditarAlojamientoComponent;
  let fixture: ComponentFixture<EditarAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAlojamientoComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            data: of({}),
            snapshot: { params: {}, data: {} },
            parent: null,
            firstChild: null
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
