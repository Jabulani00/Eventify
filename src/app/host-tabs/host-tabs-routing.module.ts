import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostTabsPage } from './host-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: HostTabsPage,
    children: [
      {
        path: 'post',
        loadChildren: () => import('../post/post.module').then(m => m.PostPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'community',
        loadChildren: () => import('../community/community.module').then(m => m.CommunityPageModule)
      },
      {
        path: 'attendEvent',
        loadChildren: () => import('../attend-event/attend-event.module').then(m => m.AttendEventPageModule)
      },
      {
        path: 'profiles',
        loadChildren: () => import('../profiles/profiles.module').then(m => m.ProfilesPageModule)
      },
      {
        path: 'hostAnalytics',
        loadChildren: () => import('../host-analytics/host-analytics.module').then(m => m.HostAnalyticsPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/host-tabs/post',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostTabsPageRoutingModule {}
