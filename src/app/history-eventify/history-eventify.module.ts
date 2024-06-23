import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryEventifyPageRoutingModule } from './history-eventify-routing.module';

import { HistoryEventifyPage } from './history-eventify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryEventifyPageRoutingModule
  ],
  declarations: [HistoryEventifyPage]
})
export class HistoryEventifyPageModule {}
