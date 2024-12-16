import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 25): string {
    if (!value) return value;

    const words = value.split(' ');
    if (words.length <= limit) {
      return value;
    }

    return words.slice(0, limit).join(' ') + '...';
  }
}
