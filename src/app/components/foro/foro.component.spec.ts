import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForoComponent } from './foro.component';
import { Router } from '@angular/router';

describe('ForoComponent', () => {
  let component: ForoComponent;
  let fixture: ComponentFixture<ForoComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ForoComponent, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: routerSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar comentarios iniciales', () => {
    expect(component.comments.length).toBeGreaterThan(0);
    expect(component.comments[0].author).toBeDefined();
    expect(component.comments[0].text).toBeDefined();
  });

  it('debe aumentar y disminuir likes correctamente', () => {
    const comment = component.comments[0];
    expect(comment.likes).toBe(0);
    component.likeComment(comment);
    expect(comment.likes).toBe(1);
    expect(comment.liked).toBeTrue();
    component.likeComment(comment);
    expect(comment.likes).toBe(0);
    expect(comment.liked).toBeFalse();
  });

  it('debe aumentar y disminuir dislikes correctamente', () => {
    const comment = component.comments[0];
    expect(comment.dislikes).toBe(0);
    component.dislikeComment(comment);
    expect(comment.dislikes).toBe(1);
    expect(comment.disliked).toBeTrue();
    component.dislikeComment(comment);
    expect(comment.dislikes).toBe(0);
    expect(comment.disliked).toBeFalse();
  });

  it('like y dislike no pueden estar activos a la vez', () => {
    const comment = component.comments[0];
    component.likeComment(comment);
    expect(comment.liked).toBeTrue();
    expect(comment.disliked).toBeFalse();
    component.dislikeComment(comment);
    expect(comment.liked).toBeFalse();
    expect(comment.disliked).toBeTrue();
  });

  it('debe navegar a PostBlog con el comentario', () => {
    const comment = component.comments[0];
    component.navigateToPostBlog(comment);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/post-blog'], { state: { comment } });
  });
});
