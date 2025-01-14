import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  http = inject(HttpClient);

  // private apiUrl = 'https://api1.atc.com.eg';
  private apiUrl = 'https://atc.com.eg';

  constructor() {}

  getPaginatedPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/paginated/4`);
  }

  getPaginatedPostsByType(type: string, pageNum: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${type}/3?page=${pageNum}`);
  }

  getPostBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/${slug}`);
  }
}
