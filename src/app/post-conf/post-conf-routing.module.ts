import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostConfPage } from './post-conf.page';

const routes: Routes = [
  {
    path: '',
    component: PostConfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostConfPageRoutingModule {}
