import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { EditarRolesComponent } from './editar-roles.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarRolesComponent', () => {
  let component: EditarRolesComponent;
  let fixture: ComponentFixture<EditarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRolesComponent, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}), snapshot: { params: {}, data: {} } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
