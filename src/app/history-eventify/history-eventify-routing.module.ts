import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryEventifyPage } from './history-eventify.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryEventifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryEventifyPageRoutingModule {}
