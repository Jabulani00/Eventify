import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule),canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then(m => m.ResetPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'attendee-tabs',
    loadChildren: () => import('./attendee-tabs/attendee-tabs.module').then(m => m.AttendeeTabsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'host-tabs',
    loadChildren: () => import('./host-tabs/host-tabs.module').then( m => m.HostTabsPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'admin-tabs',
    loadChildren: () => import('./admin-tabs/admin-tabs.module').then( m => m.AdminTabsPageModule),canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
 
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}