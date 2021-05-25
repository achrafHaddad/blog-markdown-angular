import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PostService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  postsList: any;
  postId: string = '';
  constructor(
    public postService: PostService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data: any) => {
      this.postsList = data;
    });
  }

  openModal(content: any, id: string) {
    this.postId = id;
    this.modalService.open(content);
  }

  onDelete() {
    this.postService.deletePost(this.postId).subscribe(() => {
      this.postsList = this.postsList.filter(
        (post: any) => post._id != this.postId
      );
      this.modalService.dismissAll();
    });
  }
}
