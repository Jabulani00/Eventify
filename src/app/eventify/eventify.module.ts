import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventifyPageRoutingModule } from './eventify-routing.module';

import { EventifyPage } from './eventify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventifyPageRoutingModule
  ],
  declarations: [EventifyPage]
})
export class EventifyPageModule {}
