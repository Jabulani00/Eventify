import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendEventPageRoutingModule } from './attend-event-routing.module';

import { AttendEventPage } from './attend-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendEventPageRoutingModule
  ],
  declarations: [AttendEventPage]
})
export class AttendEventPageModule {}
