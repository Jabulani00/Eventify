import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminTabsPage } from './admin-tabs.page';
import { ComsPage } from '../coms/coms.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      {
        path: 'roleManager',
        loadChildren: () => import('../role-manager/role-manager.module').then(m => m.RoleManagerPageModule)
      },
      {
        path: 'adminAnalytics',
        loadChildren: () => import('../admin-analytics/admin-analytics.module').then(m => m.AdminAnalyticsPageModule)
      },
      {
        path: 'adminProfile',
        loadChildren: () => import('../admin-profile/admin-profile.module').then(m => m.AdminProfilePageModule)
      },
      { path: 'coms', component: ComsPage },
      {
        path: 'eventify',
        loadChildren: () => import('../eventify/eventify.module').then(m => m.EventifyPageModule)
      },
      {
        path: 'historyEventify',
        loadChildren: () => import('../history-eventify/history-eventify.module').then(m => m.HistoryEventifyPageModule)
      },
      {
        path: 'postConf',
        loadChildren: () => import('../post-conf/post-conf.module').then(m => m.PostConfPageModule)
      },
      {
        path: 'tools',
        loadChildren: () => import('../tools/tools.module').then(m => m.ToolsPageModule)
      },
      {
        path: '',
        redirectTo: 'roleManager',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin-tabs/roleManager',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsPageRoutingModule {}
