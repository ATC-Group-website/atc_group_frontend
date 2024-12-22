import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
})
export class TestComponent {
  title: string =
    'ATC Group Celebrates Successful Completion of Summer Internship Program';

  rawDescription: string =
    '<h3><span style="color: rgb(136, 136, 136);">ATC&nbsp;Group&nbsp;is&nbsp;proud&nbsp;to&nbsp;announce&nbsp;the&nbsp;successful&nbsp;completion&nbsp;of&nbsp;its&nbsp;summer&nbsp;internship&nbsp;program.&nbsp;This&nbsp;year,&nbsp;our&nbsp;interns&nbsp;showcased&nbsp;exceptional&nbsp;talent,&nbsp;dedication,&nbsp;and&nbsp;a&nbsp;strong&nbsp;work&nbsp;ethic&nbsp;that&nbsp;contributed&nbsp;to&nbsp;the&nbsp;success&nbsp;of&nbsp;the&nbsp;projects&nbsp;they&nbsp;were&nbsp;involved&nbsp;in.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">Through&nbsp;hands-on&nbsp;experience&nbsp;in&nbsp;accounting&nbsp;and&nbsp;taxation,&nbsp;these&nbsp;interns&nbsp;have&nbsp;gained&nbsp;valuable&nbsp;insights&nbsp;into&nbsp;the&nbsp;industry,&nbsp;making&nbsp;a&nbsp;notable&nbsp;impact&nbsp;during&nbsp;their&nbsp;time&nbsp;with&nbsp;us.&nbsp;At&nbsp;ATC&nbsp;Group,&nbsp;we&nbsp;are&nbsp;deeply&nbsp;committed&nbsp;to&nbsp;nurturing&nbsp;the&nbsp;next&nbsp;generation&nbsp;of&nbsp;professionals.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">Our&nbsp;internship&nbsp;program&nbsp;is&nbsp;designed&nbsp;to&nbsp;provide&nbsp;participants&nbsp;with&nbsp;a&nbsp;robust,&nbsp;practical&nbsp;understanding&nbsp;of&nbsp;financial&nbsp;accounting,&nbsp;tax&nbsp;regulations,&nbsp;and&nbsp;the&nbsp;dynamics&nbsp;of&nbsp;working&nbsp;within&nbsp;a&nbsp;fast-paced&nbsp;corporate&nbsp;environment.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">Beyond&nbsp;the&nbsp;immediate&nbsp;experience,&nbsp;the&nbsp;program&nbsp;aims&nbsp;to&nbsp;prepare&nbsp;interns&nbsp;for&nbsp;long-term&nbsp;success&nbsp;by&nbsp;equipping&nbsp;them&nbsp;with&nbsp;essential&nbsp;skills&nbsp;and&nbsp;knowledge&nbsp;that&nbsp;will&nbsp;support&nbsp;their&nbsp;future&nbsp;careers&nbsp;in&nbsp;the&nbsp;financial&nbsp;sector.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">Over&nbsp;the&nbsp;course&nbsp;of&nbsp;the&nbsp;internship,&nbsp;participants&nbsp;were&nbsp;involved&nbsp;in&nbsp;real-world&nbsp;projects,&nbsp;collaborated&nbsp;with&nbsp;experienced&nbsp;professionals,&nbsp;and&nbsp;developed&nbsp;problem-solving&nbsp;abilities&nbsp;that&nbsp;will&nbsp;be&nbsp;invaluable&nbsp;as&nbsp;they&nbsp;advance&nbsp;in&nbsp;their&nbsp;careers.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">Their&nbsp;contributions&nbsp;not&nbsp;only&nbsp;benefited&nbsp;ATC&nbsp;Group&nbsp;but&nbsp;also&nbsp;demonstrated&nbsp;their&nbsp;potential&nbsp;as&nbsp;future&nbsp;leaders&nbsp;in&nbsp;the&nbsp;field.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">In&nbsp;addition&nbsp;to&nbsp;the&nbsp;hard&nbsp;work&nbsp;of&nbsp;our&nbsp;interns,&nbsp;we&nbsp;would&nbsp;like&nbsp;to&nbsp;acknowledge&nbsp;the&nbsp;pivotal&nbsp;role&nbsp;played&nbsp;by&nbsp;our&nbsp;mentors&nbsp;and&nbsp;ATC&nbsp;partners.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">Their&nbsp;guidance&nbsp;and&nbsp;support&nbsp;were&nbsp;instrumental&nbsp;in&nbsp;making&nbsp;this&nbsp;program&nbsp;a&nbsp;success.</span></h3><h3><span style="color: rgb(136, 136, 136);">By&nbsp;fostering&nbsp;a&nbsp;collaborative&nbsp;and&nbsp;educational&nbsp;environment,&nbsp;our&nbsp;mentors&nbsp;helped&nbsp;ensure&nbsp;that&nbsp;the&nbsp;interns&nbsp;had&nbsp;a&nbsp;comprehensive&nbsp;and&nbsp;rewarding&nbsp;experience.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">As&nbsp;ATC&nbsp;Group&nbsp;continues&nbsp;to&nbsp;grow&nbsp;and&nbsp;expand,&nbsp;we&nbsp;remain&nbsp;dedicated&nbsp;to&nbsp;providing&nbsp;future&nbsp;professionals&nbsp;with&nbsp;opportunities&nbsp;that&nbsp;promote&nbsp;learning&nbsp;and&nbsp;development.&nbsp;</span></h3><h3><span style="color: rgb(136, 136, 136);">We&nbsp;look&nbsp;forward&nbsp;to&nbsp;welcoming&nbsp;new&nbsp;interns&nbsp;in&nbsp;the&nbsp;coming&nbsp;years&nbsp;and&nbsp;are&nbsp;excited&nbsp;to&nbsp;see&nbsp;how&nbsp;our&nbsp;past&nbsp;participants&nbsp;will&nbsp;apply&nbsp;what&nbsp;they&nbsp;have&nbsp;learned&nbsp;as&nbsp;they&nbsp;pursue&nbsp;their&nbsp;careers.</span></h3>';

  sanitizedDescription!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Sanitize the raw HTML from the backend
    this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.rawDescription,
    );
  }
}
