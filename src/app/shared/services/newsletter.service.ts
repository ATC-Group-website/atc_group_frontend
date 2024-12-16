import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  http = inject(HttpClient);

  private apiUrl = 'https://api1.atc.com.eg';

  constructor() {}

  // subscribe to newsletter
  subscribe(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/newsletter/subscribe`,
      email,
    );
  }
}
