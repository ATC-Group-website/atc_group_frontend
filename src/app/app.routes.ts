import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { InsightsComponent } from './pages/insights/insights.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
  { path: '**', component: NotFoundComponent },
];
