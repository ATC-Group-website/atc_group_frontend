import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
interface Member {
  name: string;
  title: string;
  email: string;
  imageUrl: string;
  jobDescription: string;
}
@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, FooterComponent],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.css',
})
export class OurTeamComponent {
  teamMembers: Member[] = [
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
      jobDescription: 'This is job description',
      email: 'yara@atc.com.eg',
    },
  ];

  imageLoaded: boolean[] = new Array(this.teamMembers.length).fill(false);

  onImageLoad(index: number): void {
    this.imageLoaded[index] = true;
  }
}
