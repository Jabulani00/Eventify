import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventifyPage } from './eventify.page';

const routes: Routes = [
  {
    path: '',
    component: EventifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventifyPageRoutingModule {}
