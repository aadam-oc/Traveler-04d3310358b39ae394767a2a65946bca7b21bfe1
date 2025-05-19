import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehiculosAlquilerComponent } from './vehiculos-alquiler.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('VehiculosAlquilerComponent', () => {
  let component: VehiculosAlquilerComponent;
  let fixture: ComponentFixture<VehiculosAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosAlquilerComponent, HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
