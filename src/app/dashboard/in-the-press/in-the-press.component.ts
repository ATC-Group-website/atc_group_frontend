import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AdminDashboardService } from '../admin-dashboard.service';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-in-the-press',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    ImageModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './in-the-press.component.html',
  styleUrl: './in-the-press.component.css',
})
export class InThePressComponent implements OnInit {
  private dashboardService = inject(AdminDashboardService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);

  selectedBase64Image = signal<string | null>(null);
  filename = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  isFetching = signal<boolean>(true);
  viewMoreLoading = signal<boolean>(false);
  titleInput = signal<string>('');
  deletingImageId: number | null = null; // Track which image is being deleted

  pageNum = signal<number>(1);

  images: any[] = [];

  pressImages = [
    {
      id: 1,
      imageUrl: 'insights/elmasry_elyom_feb_15.webp',
      alt: 'elmasry elyom feb 15th',
    },
    {
      id: 2,
      imageUrl: 'insights/elgomhoria_feb_15.webp',
      alt: 'elgomhoria feb 15th',
    },
    {
      id: 3,

      imageUrl: 'insights/akhbar_elyom_feb_15.webp',
      alt: 'akhbar elyom feb 15th',
    },
    {
      id: 4,

      imageUrl: 'insights/elwafd_feb_15.webp',
      alt: 'elwafd feb 15th',
    },
    {
      id: 5,

      imageUrl: 'insights/news_paper_feb_15.webp',
      alt: 'news paper feb 15th',
    },
  ];

  ngOnInit(): void {
    this.loadNewsPaper();
  }

  loadNewsPaper() {
    this.dashboardService.getPaginatedNewsPapers(1).subscribe({
      next: (res) => {
        console.log(res);
        this.images = res.data.images;
        this.isFetching.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isFetching.set(false);
      },
    });
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
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onAddNewPress(postData: NgForm) {
    const data = {
      title: this.titleInput(),
      base64_image: this.selectedBase64Image(),
    };

    console.log(data);
    this.dashboardService.createNewsPaper(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  getNextPage() {
    this.viewMoreLoading.set(true);
    this.pageNum.set(this.pageNum() + 1);
    this.dashboardService.getPaginatedNewsPapers(this.pageNum()).subscribe({
      next: (res) => {
        console.log(res);
        this.images = [...this.images, ...res.data.images];
        this.viewMoreLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.viewMoreLoading.set(false);
      },
    });
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this newspaper?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.dashboardService.deleteNewsPaper(id).subscribe({
          next: (response) => {
            this.loadNewsPaper();
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: response.message,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
            });
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'You have rejected',
        });
      },
    });
  }

  // onDeletePressImage(id: number) {
  //   console.log(id);

  //   this.deletingImageId = id; // Set the image being deleted

  //   this.dashboardService.deleteNewsPaper(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.images = this.images.filter((image) => image.id !== id);
  //       this.deletingImageId = null; // Reset the deleting state
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.deletingImageId = null; // Reset the deleting state
  //     },
  //   });
  // }

  // Check if an image is being deleted
  isDeletingImage(id: number): boolean {
    return this.deletingImageId === id;
  }
}
