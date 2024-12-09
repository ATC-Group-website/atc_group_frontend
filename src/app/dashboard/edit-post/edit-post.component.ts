import { Component, inject } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
    NavComponent,
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    EditorModule,
    DropdownModule,
  ],
  providers: [MessageService],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent {
  selectedBase64Image: string | null = null;
  isLoading: boolean = false;
  titleInput: string = '';
  descInput: string = '';
  images: any[] = [];
  selectedGalleryImages: any[] = [];
  filename: string | null = null;

  private messageService = inject(MessageService);
  selectedCategoryValue: string | null = null;

  categories = [
    { label: 'Articles', value: '1' },
    { label: 'News & Events', value: '2' },
    { label: 'Blogs', value: '3' },
  ];

  constructor() {}

  // Function to detect if the input is Arabic
  isArabic(text: string): boolean {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text);
  }

  onAddNewPost(postData: NgForm) {
    if (postData.form.invalid) {
      Object.keys(postData.form.controls).forEach((field) => {
        const control = postData.form.controls[field];
        control.markAsTouched({ onlySelf: true });

        console.log('invalid');

        console.log(postData);

        const mainImage = {
          base64Image: this.selectedBase64Image, // Assuming this is your main image
          type: 'main',
        };

        const Data = {
          title: postData.form.controls['title'].value,
          description: postData.form.controls['description'].value,
          category_id: this.selectedCategoryValue,
          images: this.images,
        };

        console.log(mainImage);
        console.log(Data);
      });
    } else {
      // this.isLoading = true;
      console.log(postData);

      const mainImage = {
        base64Image: this.selectedBase64Image, // Assuming this is your main image
        type: 'main',
      };

      const Data = {
        title: postData.form.controls['title'].value,
        description: postData.form.controls['description'].value,
        category_id: this.selectedCategoryValue,
        images: this.images,
        youtube_url: postData.controls[''],
      };

      console.log(mainImage);
      console.log(Data);

      // sending the post data request
      // this.postsService.addPost(Data).subscribe({
      //   next: (response) => {
      //     this.toastr.success('Post added successfully');
      //     postData.form.reset();
      //     this.isLoading = false;
      //     // console.log(response);
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
          this.images.push({
            base64Image: e.target.result,
            type: 'main',
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onGalleryImagesSelected(event: any): void {
    const files: FileList = event.target.files;

    // Loop through the selected files and convert them to Base64
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push({
          base64Image: e.target.result,
          type: 'gallery', // Mark it as a gallery image
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
