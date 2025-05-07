import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent {
  author: string = '';
  comment: string = '';
  selectedComment: any;

  replies: { author: string, comment: string }[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedComment = navigation?.extras.state?.['comment'];
  }

  publishReply() {
    if (this.author && this.comment) {
      this.replies.push({ author: this.author, comment: this.comment });
      this.author = '';
      this.comment = '';
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}