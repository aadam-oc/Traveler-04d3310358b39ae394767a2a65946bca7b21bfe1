import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostBlogComponent } from './post-blog.component';
import { Router } from '@angular/router';

describe('PostBlogComponent', () => {
  let component: PostBlogComponent;
  let fixture: ComponentFixture<PostBlogComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    // Simula un comentario seleccionado en la navegación
    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          comment: {
            text: 'Comentario de prueba',
            author: 'Autor',
            image: 'img.jpg',
            stars: 5
          }
        }
      }
    } as any);

    await TestBed.configureTestingModule({
      imports: [PostBlogComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el comentario seleccionado', () => {
    expect(component.selectedComment).toBeTruthy();
    expect(component.selectedComment.text).toBe('Comentario de prueba');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Comentario de prueba');
    expect(compiled.textContent).toContain('Autor');
  });

  it('debe agregar una respuesta correctamente', () => {
    component.author = 'NuevoAutor';
    component.comment = 'Nueva respuesta';
    component.publishReply();
    expect(component.replies.length).toBe(1);
    expect(component.replies[0].author).toBe('NuevoAutor');
    expect(component.replies[0].comment).toBe('Nueva respuesta');
  });

  it('debe limpiar los campos después de publicar una respuesta', () => {
    component.author = 'OtroAutor';
    component.comment = 'Otra respuesta';
    component.publishReply();
    expect(component.author).toBe('');
    expect(component.comment).toBe('');
  });

  it('debe mostrar alerta si los campos están vacíos', () => {
    spyOn(window, 'alert');
    component.author = '';
    component.comment = '';
    component.publishReply();
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
  });
});
