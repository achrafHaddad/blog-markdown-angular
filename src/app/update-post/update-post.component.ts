import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit {
  postForm: FormGroup;
  slug: string = '';
  imgPreview: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params.slug;
    this.postService.getPost(this.slug).subscribe((res: any) => {
      this.postForm.setValue({
        title: res.title,
        description: res.description,
        content: res.content,
        image: res.imageLink,
      });
      this.imgPreview = this.postForm.value.image;
    });
  }

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

  onUpdate() {
    let postData;
    if (typeof this.postForm.value.image === 'string') {
      postData = {
        image: this.postForm.value.image,
        title: this.postForm.value.title,
        description: this.postForm.value.description,
        content: this.postForm.value.content,
      };
    } else {
      postData = new FormData();
      postData.append('image', this.postForm.value.image);
      postData.append('title', this.postForm.value.title);
      postData.append('description', this.postForm.value.description);
      postData.append('content', this.postForm.value.content);
    }

    this.postService.updatePost(this.slug, postData).subscribe(
      () => this.router.navigate(['/post', this.slug]),
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
