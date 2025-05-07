import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDestinosComponent } from './gestion-destinos.component';

describe('GestionDestinosComponent', () => {
  let component: GestionDestinosComponent;
  let fixture: ComponentFixture<GestionDestinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDestinosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
