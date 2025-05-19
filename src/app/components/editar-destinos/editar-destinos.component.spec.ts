import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditarDestinosComponent } from './editar-destinos.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarDestinosComponent', () => {
  let component: EditarDestinosComponent;
  let fixture: ComponentFixture<EditarDestinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDestinosComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { params: {}, data: {} }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
