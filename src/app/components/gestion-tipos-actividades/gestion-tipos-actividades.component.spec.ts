import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

import { GestionTiposActividadesComponent } from './gestion-tipos-actividades.component';

describe('GestionTiposActividadesComponent', () => {
  let component: GestionTiposActividadesComponent;
  let fixture: ComponentFixture<GestionTiposActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionTiposActividadesComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionTiposActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
