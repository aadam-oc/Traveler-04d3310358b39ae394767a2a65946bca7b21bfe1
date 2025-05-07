import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAlojamientosComponent } from './gestion-alojamientos.component';

describe('GestionAlojamientosComponent', () => {
  let component: GestionAlojamientosComponent;
  let fixture: ComponentFixture<GestionAlojamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAlojamientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAlojamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
