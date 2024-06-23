import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleManagerPage } from './role-manager.page';

const routes: Routes = [
  {
    path: '',
    component: RoleManagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleManagerPageRoutingModule {}
