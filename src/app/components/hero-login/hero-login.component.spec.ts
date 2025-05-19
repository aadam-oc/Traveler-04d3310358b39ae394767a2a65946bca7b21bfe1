import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroLoginComponent } from './hero-login.component';

describe('HeroLoginComponent', () => {
  let component: HeroLoginComponent;
  let fixture: ComponentFixture<HeroLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroLoginComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
