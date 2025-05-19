import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GestionRolesComponent } from './gestion-roles.component';

describe('GestionRolesComponent', () => {
  let component: GestionRolesComponent;
  let fixture: ComponentFixture<GestionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRolesComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
