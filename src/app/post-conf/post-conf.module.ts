import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostConfPageRoutingModule } from './post-conf-routing.module';

import { PostConfPage } from './post-conf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostConfPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostConfPage]
})
export class PostConfPageModule {}
  