import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDestinosComponent } from './editar-destinos.component';

describe('EditarDestinosComponent', () => {
  let component: EditarDestinosComponent;
  let fixture: ComponentFixture<EditarDestinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDestinosComponent]
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
