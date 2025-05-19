import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar las secciones de FAQ', () => {
    expect(component.faqSections.length).toBeGreaterThan(0);
    expect(component.faqSections[0].items.length).toBeGreaterThan(0);
  });

  it('debe alternar el estado de un item FAQ', () => {
    const section = component.faqSections[0];
    const item = section.items[0];
    expect(item.isActive).toBeFalse();
    component.toggleFaqItem(item);
    expect(item.isActive).toBeTrue();
    component.toggleFaqItem(item);
    expect(item.isActive).toBeFalse();
  });
});