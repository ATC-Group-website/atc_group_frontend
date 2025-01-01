import { Component, inject, signal } from '@angular/core';
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

interface ImageItem {
  base64_image: string;
  type: string;
}
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
  selectedBase64Image = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  titleInput = signal<string>('');
  descInput = signal<string>('');
  images = signal<ImageItem[]>([]);
  filename = signal<string | null>(null);
  errorMsg = signal<string>('');
  selectedCategoryValue = signal<string | null>(null);
  selectedFileNames = signal<string[]>([]);

  private messageService = inject(MessageService);
  private dashboardService = inject(AdminDashboardService);

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
      this.errorMsg.set('');
      this.isLoading.set(true);

      const Data = {
        title: postData.form.controls['title'].value,
        description: postData.form.controls['description'].value,
        type: this.selectedCategoryValue(),
        images: this.images(),
        ...(postData.controls['youtube_video_link'].value && {
          video_url: postData.controls['youtube_video_link'].value,
        }),
      };

      this.dashboardService.createPost(Data).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: response.message,
          });
          postData.form.reset();
          this.images.set([]);
          this.filename.set(null);
          this.selectedFileNames.set([]);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMsg.set(err.error.message);
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
        this.filename.set(file.name);
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result as string;
          this.selectedBase64Image.set(result);

          // Get current images
          const currentImages = this.images();

          // Create new array with the additional image
          this.images.set([
            ...currentImages,
            {
              base64_image: result,
              type: 'main',
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onGalleryImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    this.selectedFileNames.set(Array.from(files).map((file) => file.name));

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;

        // Get current images and add new one
        const currentImages = this.images();
        this.images.set([
          ...currentImages,
          {
            base64_image: result,
            type: 'gallery',
          },
        ]);
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
