import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CareersComponent } from './pages/careers/careers.component';
import { ProTrainingComponent } from './pages/pro-training/pro-training.component';
import { LocationsComponent } from './pages/locations/locations.component';

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
  { path: 'insights', component: InsightsComponent },
  { path: 'pro-training', component: ProTrainingComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'locations', component: LocationsComponent },
  { path: '**', component: NotFoundComponent },
];
