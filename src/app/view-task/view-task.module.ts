import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewTaskPage } from './view-task.page';

import { IonicModule } from '@ionic/angular';

import { ViewTaskPageRoutingModule } from './view-task-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTaskPageRoutingModule
  ],
  declarations: [ViewTaskPage]
})
export class ViewTaskPageModule {}
