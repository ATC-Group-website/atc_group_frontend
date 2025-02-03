import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  http = inject(HttpClient);

  private apiUrl = 'https://api.atc.com.eg';
  // private apiUrl = 'https://atc.com.eg';

  constructor() {}

  contact_US(formData: {
    name: string;
    position: string;
    company_name: string;
    sender: string;
    receiver: string;
    phone_number: string;
    reason_for_contact: string;
    body: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/mail/send-email`,
      formData,
    );
  }
}
