import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComsPageRoutingModule } from './coms-routing.module';

import { ComsPage } from './coms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComsPageRoutingModule
  ],
  declarations: [ComsPage]
})
export class ComsPageModule {}
