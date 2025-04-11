import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPost, PostCreationResponse, PostsCount } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  http = inject(HttpClient);

  private apiUrl = 'https://api.atc.com.eg';
  // private apiUrl = 'https://atc.com.eg';

  constructor() {}

  setAuthHeaders(token: string | null): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  createPost(postData: NewPost): Observable<PostCreationResponse> {
    return this.http.post<PostCreationResponse>(
      `${this.apiUrl}/post`,
      postData,
    );
  }

  updatePost(slug: string, postData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/post/${slug}`, postData);
  }

  getPostsCount(): Observable<PostsCount[]> {
    return this.http.get<PostsCount[]>(`${this.apiUrl}/posts-count`);
  }

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

  getEmailsCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/subscribers/count`);
  }

  getSubscribedEmails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/subscribers`);
  }

  deleteSubscribedEmail(email: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/newsletter/unsubscribe`,
      {
        params: { email },
      },
    );
  }

  createMember(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employees`, data);
  }

  changePostImage(slug: string, imageData: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/images/post/${slug}`, imageData);
  }

  removeSingleImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/images/${id}`);
  }

  sendEmails(emails: string[]): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/mail/send-greetings`,
      {
        emails,
      },
    );
  }

  createNewsPaper(data: any): Observable<any> {
    const headers = this.setAuthHeaders(localStorage.getItem('token'));

    return this.http.post<any>(`${this.apiUrl}/magazines`, data, { headers });
  }

  deleteNewsPaper(id: number): Observable<any> {
    const headers = this.setAuthHeaders(localStorage.getItem('token'));

    return this.http.delete<any>(`${this.apiUrl}/magazines/${id}`, { headers });
  }

  getPaginatedNewsPapers(pageNum: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/magazines?page=${pageNum}`);
  }

  getContactUsEmailsFromDatabase(): Observable<any> {
    const headers = this.setAuthHeaders(localStorage.getItem('token'));

    console.log('Auth Header:', headers.get('Authorization')); // Verify token format

    return this.http.get(`${this.apiUrl}/download/mails`, {
      headers,
      responseType: 'blob', // This is crucial
      observe: 'response', // Crucial for accessing headers
    });
  }
}
