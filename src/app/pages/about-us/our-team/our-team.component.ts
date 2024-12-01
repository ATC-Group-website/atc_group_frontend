import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
interface Member {
  name: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [TopBarComponent, NavBarComponent, FooterComponent, CommonModule],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.css',
})
export class OurTeamComponent {
  topManagement: Member[] = [
    {
      name: 'Ashraf Abdel Ghani',
      title: 'Founder, Managing Director and Member of The Board of Directors',
      imageUrl: 'about_us/ashraf_abdel_ghani.png',
    },
    {
      name: 'Ahmed Abdel Ghani',
      title: 'Executive Partner',
      imageUrl: 'about_us/ahmed_abdel_ghani.png',
    },
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation',
      imageUrl: 'about_us/yara_ahmed.jpg',
    },
    {
      name: 'Mayar Ahmed',
      title: 'Business Development Executive',
      imageUrl: 'about_us/mayar_ahmed.jpg',
    },
    {
      name: 'Marwan Ayman',
      title: 'Regional Branch Director - UAE',
      imageUrl: 'about_us/marwan_ayman.jpg',
    },
  ];
  branchManagers: Member[] = [
    {
      name: 'Hazem Mokhtar',
      title:
        'Board Member & Alexandria Branch Manager & Director of External Branches',
      imageUrl: 'about_us/our_team/hazem.jpg',
    },
    {
      name: 'Ramy Shokayar',
      title: 'Partner & Riyadh Branch Manager',
      imageUrl: 'about_us/our_team/Ramy.png',
    },
    {
      name: 'Ahmed Ghalib',
      title: 'Partner & Jeddah Branch Manager',
      imageUrl: 'about_us/our_team/ahmed.jpg',
    },
    {
      name: 'Abdellatif Mohamed',
      title: 'Partner & Makkah Branch Manager, MBA',
      imageUrl: 'about_us/our_team/abdellatif.png',
    },
    {
      name: 'Khaled El-Sayed',
      title: 'Partner & Al Khobar Branch Manager',
      imageUrl: 'about_us/our_team/Khaled.jpg',
    },
    {
      name: 'Marwan Ayman',
      title: 'Regional Branch Director - UAE',
      imageUrl: 'about_us/marwan_ayman.jpg',
    },
  ];

  auditMembers: Member[] = [
    {
      name: 'Khaled Abdel Aleem',
      title: 'Head of the Audit Sector',
      imageUrl: 'about_us/our_team/khaled_abdelalem.JPG',
    },
    {
      name: 'Mohamed Hassan',
      title: 'Head of the Audit Sector',
      imageUrl: 'about_us/our_team/mohamed_hassan.JPG',
    },
    {
      name: 'Ahmed Ramadan',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ahmed_ramadan.JPG',
    },
    {
      name: 'Shady Hamdy',
      title: 'Partner',
      imageUrl: 'about_us/our_team/shady_hamdy.JPG',
    },
    {
      name: 'Mostafa Abdel-Azeem',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mostafa_abdelazem.JPG',
    },
  ];
  cooprateTaxMembers: Member[] = [
    {
      name: 'Adel Bakry',
      title: 'Head of Corporate Tax Sector',
      imageUrl: 'about_us/our_team/adel_bakry.JPG',
    },
    {
      name: 'Ahmed Shehata',
      title: 'Head of Corporate Tax Sector',
      imageUrl: 'about_us/our_team/ahmed_shehata.JPG',
    },
    {
      name: 'Taric Sokar',
      title: 'Head of Corporate Tax Sector',
      imageUrl: 'about_us/our_team/taric_sokar.JPG',
    },
    {
      name: 'Yehia Mohamed',
      title: 'Head of Corporate Tax Sector',
      imageUrl: 'about_us/our_team/yahia_mohamed.JPG',
    },
    {
      name: 'Ahmed Ali',
      title: 'Head of Corporate Tax Sector',
      imageUrl: 'about_us/our_team/ahmed_ali.JPG',
    },
    {
      name: 'Mohamed Awees',
      title: 'Head of Corporate Tax Sector & 6th of October Branch Manager',
      imageUrl: 'about_us/our_team/mohamed_awees.JPG',
    },
    {
      name: 'Abdel-Salam Anwar',
      title: 'Partner',
      imageUrl: 'about_us/our_team/abdelsalam_anwar.JPG',
    },
    {
      name: 'Ahmed Abdel-Fattah',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ahmed_abdelfattah.JPG',
    },
    {
      name: 'Ahmed Youssef',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ahmed_youssef.JPG',
    },
    {
      name: 'Eslam Abdel-Wahed',
      title: 'Partner',
      imageUrl: 'about_us/our_team/eslam_abdelwahed.JPG',
    },
    {
      name: 'Hassan Ali',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hassan_ali.JPG',
    },
    {
      name: 'Hamada Bakry',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hamada_bakry.JPG',
    },
    {
      name: 'Mostafa Abdullah',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mostafa_abdalla.JPG',
    },
    {
      name: 'Mamdouh Farouk',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mamdouh_farouk.JPG',
    },
    {
      name: 'Hisham Ahmed',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hisham_ahmed.JPG',
    },
  ];

  stampTaxMembers: Member[] = [
    {
      name: 'Mohsen Abdalla',
      title: 'Head of Stamp & Real Estate Tax Sectors',
      imageUrl: 'about_us/our_team/mohsen_abdalla.JPG',
    },
  ];

  vatMembers: Member[] = [
    {
      name: 'Ehab Helmy',
      title: 'Head of VAT Sector',
      imageUrl: 'about_us/our_team/ehab_helmy.JPG',
    },
    {
      name: 'Ali Soliman',
      title: 'Head of VAT Sector',
      imageUrl: 'about_us/our_team/ali_soliman.JPG',
    },
    {
      name: 'Samira El-Sharkawy',
      title: 'Partner',
      imageUrl: 'about_us/our_team/Samira.JPG',
    },
    {
      name: 'Ashraf Mostafa',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ashraf_mostafa.JPG',
    },
    {
      name: 'Taric Samir',
      title: 'Partner',
      imageUrl: 'about_us/our_team/taric_samir.JPG',
    },
    {
      name: 'Ahmed Sobhy',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ahmed_sobhy.JPG',
    },
  ];
  internationalTaxationMembers: Member[] = [
    {
      name: 'Yara Ahmed',
      title: 'Partner & Head of International Taxation Sector',
      imageUrl: 'about_us/yara_ahmed.jpg',
    },
    {
      name: 'Mohamed Abdel-Fattah',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mohamed_abdelfattah.JPG',
    },
  ];
}
