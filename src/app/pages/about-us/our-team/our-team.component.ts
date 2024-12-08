import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NavBarComponent } from '../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ScrollToTopComponent } from '../../../shared/components/scroll-to-top/scroll-to-top.component';
interface Member {
  name: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    CommonModule,
    ScrollToTopComponent,
  ],
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
  highBoardMembers: Member[] = [
    {
      name: 'Adel Bakry',
      title: 'Head of Corporate Tax Sector',
      imageUrl: 'about_us/our_team/adel_bakry.JPG',
    },
    {
      name: 'Mohamed Zaki',
      title: 'Head of Finance & Bookeeping Sectors',
      imageUrl: 'about_us/our_team/mohamed_zaki.jpg',
    },
    {
      name: 'Mohsen Abdalla',
      title: 'Head of Stamp & Real Estate Tax Sectors',
      imageUrl: 'about_us/our_team/mohsen_abdalla.JPG',
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
      name: 'Mohamed Awees',
      title: 'Head of Corporate Tax Sector & 6th of October Branch Manager',
      imageUrl: 'about_us/our_team/mohamed_awees.JPG',
    },
    {
      name: 'Waleed Nabil',
      title: 'Nasr City Branch Manager',
      imageUrl: 'about_us/our_team/waleed_nabil.JPG',
    },
    {
      name: 'Ramy Shokayar',
      title: 'Riyadh Branch Manager',
      imageUrl: 'about_us/our_team/Ramy.jpg',
    },
    {
      name: 'Ahmed Ghalib',
      title: 'Jeddah Branch Manager',
      imageUrl: 'about_us/our_team/ahmed.jpg',
    },
    {
      name: 'Abdellatif Mohamed',
      title: 'Makkah Branch Manager, MBA',
      imageUrl: 'about_us/our_team/abdellatif.jpg',
    },
    {
      name: 'Khaled El-Sayed',
      title: 'Al Khobar Branch Manager',
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
      name: 'Moheb Khozam',
      title: 'Head of the Audit Sector',
      imageUrl: 'about_us/our_team/moheb.JPG',
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
    {
      name: 'Sameh El-Masry',
      title: 'Partner',
      imageUrl: 'about_us/our_team/sameh_elmasry.JPG',
    },
    {
      name: 'Osama Abdel Moneim',
      title: 'Partner',
      imageUrl: 'about_us/our_team/osama_abdel_moneim.JPG',
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
      name: 'Tarek Sokar',
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
      name: 'Mamdouh Farouk',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mamdouh_farouk.JPG',
    },
    {
      name: 'Hassan Ali',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hassan_ali.JPG',
    },
    {
      name: 'Osama Hassan',
      title: 'Partner',
      imageUrl: 'about_us/our_team/osama_hassan.JPG',
    },
    {
      name: 'Mostafa Abdullah',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mostafa_abdalla.JPG',
    },
    {
      name: 'Hamada Bakry',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hamada_bakry.JPG',
    },
    {
      name: 'Hisham Ahmed',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hisham_ahmed.JPG',
    },
    {
      name: 'Eslam Abdel-Wahed',
      title: 'Partner',
      imageUrl: 'about_us/our_team/eslam_abdelwahed.JPG',
    },
    {
      name: 'Ahmed Youssef',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ahmed_youssef.JPG',
    },
    {
      name: 'Hassan El-Helw',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hassan_elhelw.JPG',
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
      name: 'Alaa El-Sayed',
      title: 'VAT Consultant',
      imageUrl: 'about_us/our_team/alaa_elsayed.JPG',
    },
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
      name: 'Tarek Samir',
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

  financeAndBookkeepingMembers: Member[] = [
    {
      name: 'Mohamed Zaki',
      title: 'Head of Finance & Bookkeeping Sectors',
      imageUrl: 'about_us/our_team/mohamed_zaki.jpg',
    },
    {
      name: 'Gamal Hegazy',
      title: 'Partner of Bookeeping',
      imageUrl: 'about_us/our_team/gamal_hegazy.JPG',
    },
  ];

  salaryAndWagesTaxMembers: Member[] = [
    {
      name: 'Ahmed Abdel-Azeem',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ahmed_abdel-azeem.JPG',
    },
    {
      name: 'Hafez Seif',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hafez_seif.JPG',
    },
    {
      name: 'Khaled Elwan',
      title: 'Partner',
      imageUrl: 'about_us/our_team/khaled_elwan.JPG',
    },
    {
      name: 'Mohamed Abdel Raouf',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mohamed_abdelraouf.JPG',
    },
  ];
  translationMembers: Member[] = [
    {
      name: 'Mohamed Samy',
      title: 'Partner',
      imageUrl: 'about_us/our_team/mohamed_samy.JPG',
    },
  ];
  investmentAndCompanyIncorporationMembers: Member[] = [
    {
      name: 'Hisham Hassanien',
      title: 'Head of Investment & Company Incorporation Sector',
      imageUrl: 'about_us/our_team/hisham_hassanien.JPG',
    },
    {
      name: 'Ashraf Hassanien',
      title: 'Partner',
      imageUrl: 'about_us/our_team/ashraf_hassanien.JPG',
    },
  ];

  developmentMembers: Member[] = [
    {
      name: 'Mayar Ahmed',
      title: 'Business Development Executive',
      imageUrl: 'about_us/mayar_ahmed.jpg',
    },
  ];
  proTrainingMembers: Member[] = [
    {
      name: 'Mohamed Awdallah',
      title: 'Partner & Head of Pro Training Division',
      imageUrl: 'about_us/our_team/mohamed_awadallah.jpg',
    },
    {
      name: 'Hisham Sakr',
      title: 'Partner',
      imageUrl: 'about_us/our_team/hisham_sakr.JPG',
    },
  ];

  egyptianAssociationOfTaxExpertsMembers: Member[] = [
    {
      name: 'Amry Ali',
      title: 'Association Director',
      imageUrl: 'about_us/our_team/amry.JPG',
    },
  ];

  moreMembers: Member[] = [
    {
      name: 'Farag Abdel Samee',
      title: 'Discount and Collection Consultant',
      imageUrl: 'about_us/our_team/farag.JPG',
    },
  ];
}
