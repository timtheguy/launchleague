import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBetPage } from './add-bet';

@NgModule({
  declarations: [
    AddBetPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBetPage),
  ],
})
export class AddBetPageModule {}
