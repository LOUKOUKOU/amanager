import { inject, NgModule } from '@angular/core';
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
import { LoginService } from './services/LoginService';
import { authGuardGuard } from './guards/auth-guard.guard';
import { SessionService } from './services/SessionService';
import { ProjectsComponent } from './views/admin/projects/projects.component';
import { TasksComponent } from './views/admin/tasks/tasks.component';
import { ProfilesComponent } from './views/admin/profiles/profiles.component';

export const routes: Routes = [
  // admin views
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [authGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'profiles', component: ProfilesComponent },
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
  {
    path: '',
    redirectTo: () => {
      const sessionService = inject(SessionService);
      console.log(sessionService.isAuthenticated());

      if (sessionService.isAuthenticated()) {
        return 'admin/dashboard';
      } else {
        return 'auth/login';
      }
    },
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'admin', pathMatch: 'full' },
];
