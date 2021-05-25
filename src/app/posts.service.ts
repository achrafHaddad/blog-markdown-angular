import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get(environment.base_url);
  }

  getPost(slug: string) {
    return this.http.get(`${environment.base_url}/${slug}`);
  }

  createPost(body: any) {
    return this.http.post(`${environment.base_url}/create`, body);
  }

  updatePost(id: string, body: any) {
    return this.http.put(`${environment.base_url}/update/${id}`, body);
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.base_url}/delete/${id}`);
  }
}
