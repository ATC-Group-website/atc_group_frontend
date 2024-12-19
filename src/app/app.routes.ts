import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ProTrainingComponent } from './pages/pro-training/pro-training.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { adminGuard } from './dashboard/admin.guard';
import { InsightDetailsComponent } from './pages/insight-details/insight-details.component';
import { TestComponent } from './shared/components/test/test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'our-team',

    loadComponent: () =>
      import('./pages/about-us/our-team/our-team.component').then(
        (mod) => mod.OurTeamComponent,
      ),
  },
  { path: 'services', component: ServicesComponent },
  { path: 'test', component: TestComponent },
  {
    path: 'services/audit',

    loadComponent: () =>
      import('./pages/services/audit/audit.component').then(
        (mod) => mod.AuditComponent,
      ),
  },
  {
    path: 'services/tax',

    loadComponent: () =>
      import('./pages/services/tax/tax.component').then(
        (mod) => mod.TaxComponent,
      ),
  },
  {
    path: 'services/investments-and-company-incorporation',

    loadComponent: () =>
      import('./pages/services/investment/investment.component').then(
        (mod) => mod.InvestmentComponent,
      ),
  },
  {
    path: 'services/social-insurance',

    loadComponent: () =>
      import(
        './pages/services/social-insurance/social-insurance.component'
      ).then((mod) => mod.SocialInsuranceComponent),
  },
  {
    path: 'services/e-invoice',

    loadComponent: () =>
      import('./pages/services/e-invoice/e-invoice.component').then(
        (mod) => mod.EInvoiceComponent,
      ),
  },
  {
    path: 'services/system-inspection',

    loadComponent: () =>
      import(
        './pages/services/system-inspection/system-inspection.component'
      ).then((mod) => mod.SystemInspectionComponent),
  },
  {
    path: 'services/international-taxation',

    loadComponent: () =>
      import(
        './pages/services/international-taxation/international-taxation.component'
      ).then((mod) => mod.InternationalTaxationComponent),
  },
  {
    path: 'services/transfer-pricing',

    loadComponent: () =>
      import(
        './pages/services/transfer-pricing/transfer-pricing.component'
      ).then((mod) => mod.TransferPricingComponent),
  },
  { path: 'insights', component: InsightsComponent },
  { path: 'insights/:slug', component: InsightDetailsComponent },
  { path: 'pro-training', component: ProTrainingComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'locations', component: LocationsComponent },
  // {
  //   path: 'locations',

  //   loadComponent: () =>
  //     import('./pages/locations/locations.component').then(
  //       (mod) => mod.LocationsComponent,
  //     ),
  // },
  { path: 'contact-us', component: ContactUsComponent },

  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./dashboard/login/login.component').then(
            (mod) => mod.LoginComponent,
          ),
      },
      {
        path: 'dashboard',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/dashboard-home/dashboard-home.component').then(
            (mod) => mod.DashboardHomeComponent,
          ),
        title: 'ATC Group Dashboard',
      },
      {
        path: 'add-new-post',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/add-new-post/add-new-post.component').then(
            (mod) => mod.AddNewPostComponent,
          ),
        title: 'Dashboard | New Post',
      },
      {
        path: 'edit-post/:slug',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/edit-post/edit-post.component').then(
            (mod) => mod.EditPostComponent,
          ),
        title: 'Dashboard | Edit Post',
      },
      {
        path: 'articles',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/articles/articles.component').then(
            (mod) => mod.ArticlesComponent,
          ),
        title: 'Dashboard | Articles',
      },
      {
        path: 'news-and-events',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/news-and-events/news-and-events.component').then(
            (mod) => mod.NewsAndEventsComponent,
          ),
        title: 'Dashboard | News and Events',
      },
      {
        path: 'blogs',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/blogs/blogs.component').then(
            (mod) => mod.BlogsComponent,
          ),
        title: 'Dashboard | Blogs',
      },
      {
        path: 'atc-members',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/members/members.component').then(
            (mod) => mod.MembersComponent,
          ),
        title: 'Dashboard | ATC Members',
      },
      {
        path: 'add-member',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/add-member/add-member.component').then(
            (mod) => mod.AddMemberComponent,
          ),
        title: 'Dashboard | ATC Members',
      },
      {
        path: 'edit-member',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/edit-member/edit-member.component').then(
            (mod) => mod.EditMemberComponent,
          ),
        title: 'Dashboard | ATC Members',
      },
      {
        path: 'emails',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/emails/emails.component').then(
            (mod) => mod.EmailsComponent,
          ),
        title: 'Dashboard | Emails',
      },
      {
        path: 'emails/send-email',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./dashboard/send-emails/send-emails.component').then(
            (mod) => mod.SendEmailsComponent,
          ),
        title: 'Dashboard | Emails',
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
