import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPost, PostCreationResponse } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  http = inject(HttpClient);

  private apiUrl = 'https://api1.atc.com.eg';

  constructor() {}

  createPost(postData: NewPost): Observable<PostCreationResponse> {
    return this.http.post<PostCreationResponse>(
      `${this.apiUrl}/post`,
      postData,
    );
  }

  // updatePost(postData:any):Observable<any>{
  //   return this.http.patch()
  // }

  getSinglePost(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/${slug}`);
  }

  getPostsByType(
    postsType: string,
    postsPerPage: number,
    pageNum: number,
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/posts/${postsType}/${postsPerPage}?page=${pageNum}`,
    );
  }

  deletePost(slug: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/post/${slug}`);
  }
}