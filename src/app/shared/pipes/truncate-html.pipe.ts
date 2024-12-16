import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'truncateHtml',
  standalone: true,
})
export class TruncateHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): SafeHtml {
    if (!html) return this.sanitizer.bypassSecurityTrustHtml('');

    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Extract plain text content
    const text = tempDiv.textContent || tempDiv.innerText || '';

    // Split into words
    const words = text.trim().split(/\s+/);

    return this.sanitizer.bypassSecurityTrustHtml(tempDiv.innerHTML);
  }
}
// constructor(private sanitizer: DomSanitizer) {}

// transform(
//   value: string | null | undefined,
//   wordCount: number = 25,
// ): SafeHtml {
//   if (!value) return this.sanitizer.bypassSecurityTrustHtml('');

//   // Create a temporary div to parse the HTML
//   const tempDiv = document.createElement('div');
//   tempDiv.innerHTML = value;

//   // Extract the plain text content
//   const text = tempDiv.textContent || tempDiv.innerText || '';

//   // Split into words and truncate
//   const words = text.trim().split(/\s+/);
//   const truncatedWords = words.slice(0, wordCount);
//   const truncatedText =
//     truncatedWords.join(' ') + (words.length > wordCount ? '...' : '');

//   // Rebuild the HTML with the truncated text
//   const truncatedHtml = this.insertTruncatedText(value, truncatedText);

//   // Sanitize and return the truncated HTML
//   return this.sanitizer.bypassSecurityTrustHtml(truncatedHtml);
// }

// private insertTruncatedText(
//   originalHtml: string,
//   truncatedText: string,
// ): string {
//   const tempDiv = document.createElement('div');
//   tempDiv.innerHTML = originalHtml;

//   // Replace the first instance of the text content with the truncated text
//   this.replaceTextContent(tempDiv, truncatedText);

//   return tempDiv.innerHTML;
// }

// private replaceTextContent(element: Element, newText: string) {
//   if (element.nodeType === Node.TEXT_NODE) {
//     // Replace the text node content with the truncated text
//     element.textContent = newText;
//     return;
//   }

//   // Only replace text in direct text nodes, not in HTML tags.
//   let textReplaced = false;
//   for (let i = 0; i < element.childNodes.length; i++) {
//     const node = element.childNodes[i];

//     if (node.nodeType === Node.TEXT_NODE && !textReplaced) {
//       node.textContent = newText; // Replace text only once
//       textReplaced = true;
//       return; // Stop after replacing the first text node
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       // Recurse into child elements, but don't modify the HTML structure
//       this.replaceTextContent(node as Element, newText);
//     }
//   }
// }
