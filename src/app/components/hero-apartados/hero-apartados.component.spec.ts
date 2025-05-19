import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroApartadosComponent } from './hero-apartados.component';

describe('HeroApartadosComponent', () => {
  let component: HeroApartadosComponent;
  let fixture: ComponentFixture<HeroApartadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroApartadosComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroApartadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
