import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendeeTabsPageRoutingModule } from './attendee-tabs-routing.module';

import { AttendeeTabsPage } from './attendee-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendeeTabsPageRoutingModule
  ],
  declarations: [AttendeeTabsPage]
})
export class AttendeeTabsPageModule {}
