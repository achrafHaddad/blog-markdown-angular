import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imgPreview: string = '';

  constructor(private postService: PostService, private router: Router) {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      content: new FormControl(''),
      image: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onImagePick(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.postForm.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const postData = new FormData();
    console.log(this.postForm.value.image);

    postData.append('image', this.postForm.value.image);
    postData.append('title', this.postForm.value.title);
    postData.append('description', this.postForm.value.description);
    postData.append('content', this.postForm.value.content);

    this.postService.createPost(postData).subscribe(
      () => this.router.navigate(['/']),
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
