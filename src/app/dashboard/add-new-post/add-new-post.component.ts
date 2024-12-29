import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AdminDashboardService } from '../admin-dashboard.service';

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    DropdownModule,
    EditorModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './add-new-post.component.html',
  styleUrl: './add-new-post.component.css',
})
export class AddNewPostComponent {
  selectedBase64Image: string | null = null;
  isLoading: boolean = false;
  titleInput: string = '';
  descInput: string = '';
  images: any[] = [];
  filename: string | null = null;
  errorMsg: string = '';

  private messageService = inject(MessageService);
  private dashboardService = inject(AdminDashboardService);
  private router = inject(Router);
  selectedCategoryValue: string | null = null;
  selectedFileNames: string[] = [];

  categories = [
    { label: 'Articles', value: 'article' },
    { label: 'News & Events', value: 'news' },
    { label: 'Blogs', value: 'blog' },
  ];

  constructor() {}

  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  onAddNewPost(postData: NgForm) {
    if (postData.form.invalid) {
      Object.keys(postData.form.controls).forEach((field) => {
        const control = postData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.errorMsg = '';
      this.isLoading = true;

      const Data = {
        title: postData.form.controls['title'].value,
        description: postData.form.controls['description'].value,
        type: this.selectedCategoryValue,
        images: this.images,
        ...(postData.controls['youtube_video_link'].value && {
          video_url: postData.controls['youtube_video_link'].value,
        }),
      };

      this.dashboardService.createPost(Data).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: response.message,
          });
          postData.form.reset();
          this.images = [];
          this.filename = null;
          this.selectedFileNames = [];
        },
        error: (err) => {
          console.log(err);

          this.isLoading = false;
          if (err.error.message === 'Token has expired') {
            localStorage.removeItem('token');
            this.router.navigateByUrl('admin/login');
          } else if (err.error) {
            this.errorMsg = err.error.message;
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.filename = file.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedBase64Image = e.target.result;
          this.images.push({
            base64_image: e.target.result,
            type: 'main',
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onGalleryImagesSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFileNames = Array.from(files).map((file: File) => file.name);
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({
          base64_image: e.target.result,
          type: 'gallery',
        });
      };
      reader.readAsDataURL(file);
    });
  }

  // customizing the editor
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }], // Font family
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ align: [] }],
      [{ direction: 'rtl' }], // text direction
      ['link', 'image'],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      ['blockquote', 'code-block'],
      ['clean'], // remove formatting button
    ],
  };
}
