import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VuelosComponent } from './vuelos.component';

describe('VuelosComponent', () => {
  let component: VuelosComponent;
  let fixture: ComponentFixture<VuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
