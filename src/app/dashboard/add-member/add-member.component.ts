import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AdminDashboardService } from '../admin-dashboard.service';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [
    NavComponent,
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css',
})
export class AddMemberComponent {
  selectedBase64Image: string | null = null;
  isLoading: boolean = false;
  titleInput: string = '';
  filename: string | null = null;

  messageService = inject(MessageService);
  dashboardService = inject(AdminDashboardService);
  selectedDepartmentValue: string | null = null;

  departments = [
    { label: 'Top Management', value: 1 },
    { label: 'High Board Members', value: 2 },
    { label: 'Branch Managers', value: 3 },
    { label: 'Cooprate Tax', value: 4 },
    { label: 'Vat', value: 5 },
    { label: 'Salary & Wages Tax', value: 6 },
    { label: 'International Taxation', value: 7 },
    { label: 'Stamp Tax', value: 8 },
    { label: 'Audit', value: 9 },
    { label: 'Finance & Bookkeeping', value: 10 },
    { label: 'Investment & Company Incorporation', value: 11 },
    { label: 'Translation', value: 12 },
    { label: 'Development', value: 13 },
    { label: 'Pro-Training', value: 14 },
    { label: 'Egyptian Association Of Tax Experts', value: 15 },
    { label: 'Discount & Collection', value: 16 },
    { label: 'Other Members', value: 18 },
  ];

  constructor() {}

  // Function to detect if the input is Arabic
  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  addNewMember(postData: NgForm) {
    if (postData.form.invalid) {
      Object.keys(postData.form.controls).forEach((field) => {
        const control = postData.form.controls[field];
        control.markAsTouched({ onlySelf: true });

      });
    } else {
      this.isLoading = true;

      const Data = {
        name: postData.form.controls['name'].value,
        job_title: postData.form.controls['title'].value,
        department_id: 1,
        order: 1,
        base64_image: this.selectedBase64Image,
      };


      this.dashboardService.createMember(Data).subscribe({
        next: (res) => {
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });

      // sending the post data request
      // this.postsService.addPost(Data).subscribe({
      //   next: (response) => {
      //     this.toastr.success('Post added successfully');
      //     postData.form.reset();
      //     this.isLoading = false;
      //   },
      //   error: (err) => {
      //     console.error('Error submitting form:', err);
      //     this.toastr.error('Error');
      //     this.isLoading = false;
      //   },
      // });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.filename = file.name; // Store the file name
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedBase64Image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
