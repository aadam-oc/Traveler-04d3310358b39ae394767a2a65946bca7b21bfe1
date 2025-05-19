import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForoComponent } from './foro.component';

describe('ForoComponent', () => {
  let component: ForoComponent;
  let fixture: ComponentFixture<ForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForoComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
