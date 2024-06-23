import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostAnalyticsPage } from './host-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: HostAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostAnalyticsPageRoutingModule {}
