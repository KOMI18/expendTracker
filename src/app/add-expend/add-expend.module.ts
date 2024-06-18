import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExpendPageRoutingModule } from './add-expend-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AddExpendPage } from './add-expend.page';
import { environment } from '../../environments/environment' ;
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExpendPageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  declarations: [AddExpendPage]
})
export class AddExpendPageModule {

  constructor() {
    // Initialisez Firebase
    const app = initializeApp(environment.firebaseConfig);

    // Initialisez Firebase Analytics (facultatif)
    const analytics = getAnalytics(app);

    // Obtenez une référence à la base de données Firebase
    const database = getDatabase(app);
  }
}
