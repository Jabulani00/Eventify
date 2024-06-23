import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendEventPage } from './attend-event.page';

const routes: Routes = [
  {
    path: '',
    component: AttendEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendEventPageRoutingModule {}
