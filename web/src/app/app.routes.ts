import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// layouts
import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

// admin views
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { SettingsComponent } from './views/admin/settings/settings.component';

// auth views
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

// no layouts views
import { ProfileComponent } from './views/profile/profile.component';

export const routes: Routes = [
  // admin views
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: SettingsComponent },
      // { path: 'tasks', component: TablesComponent },
      // { path: 'profiles', component: TablesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  // auth views
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  // no layout views
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: 'admin', pathMatch: 'full' },
];
