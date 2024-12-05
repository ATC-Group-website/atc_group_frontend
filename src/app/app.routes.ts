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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'about-us/our-team',

    loadComponent: () =>
      import('./pages/about-us/our-team/our-team.component').then(
        (mod) => mod.OurTeamComponent,
      ),
  },
  { path: 'services', component: ServicesComponent },
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
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
