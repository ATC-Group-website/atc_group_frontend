import { Component, inject, OnInit, signal } from '@angular/core';
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

interface ImageItem {
  base64_image: string;
  type: string;
}
@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
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
  isLoading = signal<boolean>(true);
  loading = signal<boolean>(false);
  post = signal<Post | null>(null);
  editpostForm!: FormGroup;
  formGroup = signal<FormGroup | undefined>(undefined);
  images = signal<ImageItem[]>([]);
  selectedGalleryImages = signal<
    { base64_image: string; title: string; type: string }[]
  >([]);
  fileName = signal<string | null>(null);
  selectedFile = signal<File | null>(null);
  gallery_images = signal<
    { path: string; type: string; title: string; id: number }[]
  >([]);
  main_image = signal<string | null>(null);
  isUploadingImage = signal<boolean>(false);
  selectedBase64Image = signal<string | null>(null);
  fileNames = signal<string[]>([]);

  isModalOpen = signal<boolean>(false);
  GalleryModal = signal<boolean>(false);
  uploadVideoModal = signal<boolean>(false);
  isUploadingVideo = signal<boolean>(false);
  selectedCategoryValue = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);
  private dashboardService = inject(AdminDashboardService);

  categories = [
    { label: 'Articles', value: 'article' },
    { label: 'News & Events', value: 'news' },
    { label: 'Blogs', value: 'blog' },
  ];

  constructor() {}

  ngOnInit(): void {
    (this.editpostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl({ value: '', disabled: true }, Validators.required),
      description: new FormControl('', Validators.required),
      video_url: new FormControl(''),
    })),
      this.loadPost();
  }

  loadPost() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.dashboardService.getSinglePost(slug).subscribe({
        next: (res) => {
          this.gallery_images.set(
            res.images.filter((image: any) => image.type === 'gallery'),
          );
          this.isLoading.set(false);
          this.main_image.set(res.images[0].path);
          this.post.set(res);

          this.editpostForm.patchValue({
            title: this.post()?.title,
            description: this.post()?.description,
            type: this.post()?.type,
            video_url: this.post()?.video_url,
          });
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    }
  }
  // Function to detect if the input is Arabic
  isArabic(text: string): boolean {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
  }

  onUpdatePost() {
    if (this.editpostForm.valid) {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.loading.set(true);

        const jobData = this.editpostForm.value;
        this.dashboardService.updatePost(slug, jobData).subscribe({
          next: () => {
            this.loading.set(false);
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Post updated successfully',
            });
          },
          error: () => {
            this.loading.set(false);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update job. Please try again.',
            });
          },
        });
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
        this.fileName.set(file.name);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedBase64Image.set(e.target.result);
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
          this.selectedGalleryImages().push({
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
      });
    } else if (imageData.form.valid) {
      this.loading.set(true);
      const ImageData = {
        base64_image: this.selectedBase64Image(),
        title: this.post()?.title,
        type: 'main',
      };

      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.dashboardService.changePostImage(slug, ImageData).subscribe({
          next: () => {
            this.loading.set(false);
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Image updated successfully',
            });
            this.isModalOpen.set(false);
            this.loadPost();
          },
          error: () => {
            this.loading.set(false);
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

    if (imagesData.form.valid && this.selectedGalleryImages().length > 0) {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        this.isUploadingImage.set(true);
        this.loading.set(true);

        // Create an array of observables for each image upload
        const uploadObservables = this.selectedGalleryImages().map(
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
          next: () => {
            this.loading.set(false);
            this.GalleryModal.set(false);
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Images uploaded successfully',
            });
            this.loadPost();
          },
          error: () => {},
          complete: () => {
            this.isUploadingImage.set(false);
            this.selectedGalleryImages.set([]);
          },
        });
      }
    }
  }

  // delete gallery image
  onDeleteGalleryImage(id: number): void {
    this.loading.set(true);

    this.dashboardService.removeSingleImage(id).subscribe({
      next: () => {
        this.loading.set(false);
        this.loadPost();
        this.GalleryModal.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  // change main image modal
  openModal(): void {
    this.isModalOpen.set(true);
  }

  // open gallery modal
  openGalleryModal(): void {
    this.GalleryModal.set(true);
  }
  // open gallery modal
  openUploadVideo(): void {
    this.uploadVideoModal.set(true);
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
