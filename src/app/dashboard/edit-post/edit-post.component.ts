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
import { DialogModule } from 'primeng/dialog';
import { forkJoin } from 'rxjs';

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
    DialogModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  isLoading: boolean = true;
  loading: boolean = false;
  editpostForm!: FormGroup;
  post!: Post;
  formGroup: FormGroup | undefined;
  images: any[] = [];
  selectedGalleryImages: any[] = [];
  filename: string | null = null;
  selectedFile: File | null = null;
  gallery_images: any[] = [];
  main_image: string = '';
  isUploadingImage: boolean = false;
  selectedBase64Image: string | null = null;
  filenames: string[] = [];

  isModalOpen = false;
  GalleryModal = false;
  uploadVideoModal = false;
  isUploadingVideo: boolean = false;

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

    this.loadPost();
  }

  loadPost() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.dashboardService.getSinglePost(slug).subscribe({
        next: (res) => {
          this.gallery_images = res.images.filter(
            (image: any) => image.type === 'gallery',
          );
          this.isLoading = false;
          this.main_image = res.images[0].path;
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

          // this.editpostForm.patchValue({
          //   title: this.post.title,
          //   type: this.post.type,
          //   youtube_video_link: this.post.video_url,
          //   description: this.post.description,
          // });
        },
        error: (error) => {
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
        this.loading = true;

        const jobData = this.editpostForm.value;
        console.log(jobData.description);

        this.dashboardService.updatePost(slug, jobData).subscribe({
          next: (res) => {
            console.log(res);

            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Post updated successfully',
            });
          },
          error: (error) => {
            console.log(error);

            this.loading = false;
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];
      if (file) {
        this.filename = file.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedBase64Image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // handling gallery images
  onGalleryImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files: FileList = input.files;

      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedGalleryImages.push({
            base64_image: e.target.result,
            title: file.name,
            type: 'gallery',
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onUpdateImage(imageData: NgForm): void {
    if (imageData.form.invalid) {
      Object.keys(imageData.form.controls).forEach((field) => {
        const control = imageData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
        this.loading = true;
      });
    } else if (imageData.form.valid) {
      this.loading = true;
      const ImageData = {
        base64_image: this.selectedBase64Image,
        title: this.post.title,
        type: 'main',
      };

      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.dashboardService.changePostImage(slug, ImageData).subscribe({
          next: (response) => {
            this.loading = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Image updated successfully',
            });
            this.isModalOpen = false;
            this.loadPost();
          },
          error: (err) => {
            this.loading = false;
          },
        });
      }
    }
  }

  // update gallery images
  onUpdateGallery(imagesData: NgForm): void {
    if (imagesData.form.invalid) {
      Object.keys(imagesData.form.controls).forEach((field) => {
        const control = imagesData.form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      return;
    }
    if (imagesData.form.valid && this.selectedGalleryImages.length > 0) {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.isUploadingImage = true;
        this.loading = true;

        // Create an array of observables for each image upload
        const uploadObservables = this.selectedGalleryImages.map(
          (image: any) => {
            const imageData = {
              base64_image: image.base64_image,
              title: image.title,
              type: image.type,
            };
            return this.dashboardService.changePostImage(slug, imageData); // Each upload request as an observable
          },
        );

        // Use forkJoin to wait until all uploads complete
        forkJoin(uploadObservables).subscribe({
          next: (res) => {
            this.loading = false;
            this.GalleryModal = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Images uploaded successfully',
            });
            this.loadPost(); // Reload post after uploading images
          },
          error: (err) => {},
          complete: () => {
            this.isUploadingImage = false; // Set to false only when all uploads complete
            this.selectedGalleryImages = []; // Clear images array
          },
        });
      }
    }
  }

  // delete gallery image
  onDeleteGalleryImage(id: number): void {
    this.loading = true;

    this.dashboardService.removeSingleImage(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.loadPost();
        this.GalleryModal = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  // change main image modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // open gallery modal
  openGalleryModal(): void {
    this.GalleryModal = true;
  }
  // open gallery modal
  openUploadVideo(): void {
    this.uploadVideoModal = true;
  }

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
