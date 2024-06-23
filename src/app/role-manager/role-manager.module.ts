import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleManagerPageRoutingModule } from './role-manager-routing.module';

import { RoleManagerPage } from './role-manager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleManagerPageRoutingModule
  ],
  declarations: [RoleManagerPage]
})
export class RoleManagerPageModule {}
