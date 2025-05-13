import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTiposActividadesComponent } from './editar-tipos-actividades.component';

describe('EditarTiposActividadesComponent', () => {
  let component: EditarTiposActividadesComponent;
  let fixture: ComponentFixture<EditarTiposActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTiposActividadesComponent]
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
