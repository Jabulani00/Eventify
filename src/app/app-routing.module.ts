import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then(m => m.ResetPageModule)
  },
  {
    path: 'attendee-tabs',
    loadChildren: () => import('./attendee-tabs/attendee-tabs.module').then(m => m.AttendeeTabsPageModule)
  },
  {
    path: 'host-tabs',
    loadChildren: () => import('./host-tabs/host-tabs.module').then( m => m.HostTabsPageModule)
  },
  {
    path: 'admin-tabs',
    loadChildren: () => import('./admin-tabs/admin-tabs.module').then( m => m.AdminTabsPageModule)
  }
 
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}