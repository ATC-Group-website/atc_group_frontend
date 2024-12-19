import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml',
  standalone: true,
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string, wordLimit?: number): string {
    if (!value) return '';
    // Remove HTML tags
    let plainText = value.replace(/<[^>]+>/g, '');
    // Optionally limit the number of words
    if (wordLimit) {
      plainText = plainText.split(/\s+/).slice(0, wordLimit).join(' ');
    }
    // Replace newlines or periods with line breaks
    return plainText.replace(/(?:\r\n|\r|\n|\. )/g, '<br>');
  }
}
