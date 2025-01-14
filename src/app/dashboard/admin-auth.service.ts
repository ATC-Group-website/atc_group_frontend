import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, Login } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  http = inject(HttpClient);

  // private apiUrl = 'https://api1.atc.com.eg';
  private apiUrl = 'https://atc.com.eg';

  constructor() {}

  login(loginData: Login): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/admin/login`, loginData);
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/admin/logout`,
      {},
    );
  }
}
