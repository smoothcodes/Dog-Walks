import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlaceFormPageRoutingModule } from './add-place-form-routing.module';

import { AddPlaceFormPage } from './add-place-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlaceFormPageRoutingModule
  ],
  declarations: [AddPlaceFormPage],
  providers: []
})
export class AddPlaceFormPageModule {}
