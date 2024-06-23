import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComsPage } from './coms.page';

const routes: Routes = [
  {
    path: '',
    component: ComsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComsPageRoutingModule {}
