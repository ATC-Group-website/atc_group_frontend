import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { OurTeamComponent } from './pages/about-us/our-team/our-team.component';

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
  { path: '**', redirectTo: '' }, // Optional: Redirects unknown paths to the home route
];
