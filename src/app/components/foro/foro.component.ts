import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent {
  comments = [
    {
      text: 'Me parece una página increíble, me ha servido para irme de viaje con mis amigos.',
      author: 'Aleix Martinez',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false
    },
    {
      text: 'Un sitio web muy útil y fácil de navegar.',
      author: 'Ana Gómez',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false
    },
    {
      text: 'La información es clara y bien estructurada.',
      author: 'Carlos López',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false
    },
  ];

  // Inyecta el Router en el constructor
  constructor(private router: Router) {}

  // Método para navegar a la página de PostBlog
  navigateToPostBlog(comment: any) {
    this.router.navigate(['/post-blog'], { state: { comment } });
  }

  // Métodos para manejar likes y dislikes
  likeComment(comment: any) {
    if (!comment.liked) {
      comment.likes++;
      comment.liked = true;
      if (comment.disliked) {
        comment.dislikes--;
        comment.disliked = false;
      }
    } else {
      comment.likes--;
      comment.liked = false;
    }
  }

  dislikeComment(comment: any) {
    if (!comment.disliked) {
      comment.dislikes++;
      comment.disliked = true;
      if (comment.liked) {
        comment.likes--;
        comment.liked = false;
      }
    } else {
      comment.dislikes--;
      comment.disliked = false;
    }
  }
}