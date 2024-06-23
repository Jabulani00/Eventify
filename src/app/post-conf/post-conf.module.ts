import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostConfPageRoutingModule } from './post-conf-routing.module';

import { PostConfPage } from './post-conf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostConfPageRoutingModule
  ],
  declarations: [PostConfPage]
})
export class PostConfPageModule {}
