import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { ActivatedRoute } from '@angular/router';
import { AdminDashboardService } from '../admin-dashboard.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { Post } from '../interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    NavComponent,
    CommonModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    EditorModule,
    DropdownModule,
    LoadingComponent,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  isLoading: boolean = true;
  editpostForm!: FormGroup;
  post!: Post;
  formGroup: FormGroup | undefined;
  images: any[] = [];
  selectedGalleryImages: any[] = [];
  filename: string | null = null;
  selectedFile: File | null = null;
  gallery_images: any[] = [];

  isModalOpen = false;
  isGalleryModalOpen = false;

  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private dashboardService = inject(AdminDashboardService);

  selectedCategoryValue: string | null = null;

  categories = [
    { label: 'Articles', value: 'article' },
    { label: 'News & Events', value: 'news' },
    { label: 'Blogs', value: 'blog' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.editpostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl({ value: '', disabled: true }, Validators.required),
      description: new FormControl('', Validators.required),
      video_url: new FormControl(''),
    });

    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.dashboardService.getSinglePost(slug).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          this.post = res;

          this.editpostForm.patchValue({
            title: this.post.title,
            description: this.post.description,
            type: this.post.type,
            video_url: this.post.video_url,
          });

          this.gallery_images = res.images.filter(
            (imageUrl: any) => imageUrl.type === 'gallery',
          );
          console.log(this.gallery_images);

          // this.editpostForm.patchValue({
          //   title: this.post.title,
          //   type: this.post.type,
          //   youtube_video_link: this.post.video_url,
          //   description: this.post.description,
          // });
        },
        error: (error) => {
          console.log(error);

          this.isLoading = false;
        },
      });
    }
  }

  // Function to detect if the input is Arabic
  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  onUpdatePost() {
    if (this.editpostForm.valid) {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.isLoading = true;

        const jobData = this.editpostForm.value;
        console.log('Job Updated:', jobData);

        this.dashboardService.updatePost(slug, jobData).subscribe({
          next: (res) => {
            console.log(res);

            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Post updated successfully',
            });
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error updating Post', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update job. Please try again.',
            });
          },
        });

        // Add logic here to send `jobData` to the backend
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Please check all required fields',
        });
      }
    }
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     const file = input.files[0];
  //     if (file) {
  //       this.filename = file.name; // Store the file name
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.images.push({
  //           base64Image: e.target.result,
  //           type: 'main',
  //         });
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  // onGalleryImagesSelected(event: any): void {
  //   const files: FileList = event.target.files;

  //   // Loop through the selected files and convert them to Base64
  //   Array.from(files).forEach((file: File) => {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.images.push({
  //         base64Image: e.target.result,
  //         type: 'gallery', // Mark it as a gallery image
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }

  getCategoryLabel(type: string): string {
    switch (type) {
      case 'article':
        return 'Articles';
      case 'news':
        return 'News & Events';
      case 'blog':
        return 'Blogs';
      default:
        return 'Unknown';
    }
  }

  // change main image modal
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // open gallery modal
  openGalleryModal(): void {
    this.isGalleryModalOpen = true;
  }

  // close gallery modal
  closeGalleryModal(): void {
    this.isGalleryModalOpen = false;
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
