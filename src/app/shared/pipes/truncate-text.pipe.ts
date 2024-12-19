import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true,
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const words = value.split(' '); // Split text into words
    if (words.length <= 5) return value; // Return original if less than limit

    return words.slice(0, 5).join(' ') + '...'; // Join first 10 words and add ellipsis
  }
}
