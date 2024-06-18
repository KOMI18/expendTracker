import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { HomePageRoutingModule } from './home-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import{FooterComponent} from '../footer/footer.component'
const firebaseConfig = {
  apiKey: "AIzaSyD7Z2SU9J4kUCjWpO3dQmPrFM9Ic3Vyz9Y",
  authDomain: "proejet-firebase.firebaseapp.com",
  databaseURL: "https://proejet-firebase-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "proejet-firebase",
  storageBucket: "proejet-firebase.appspot.com",
  messagingSenderId: "1062216492829",
  appId: "1:1062216492829:web:cba2b987b93955445123f4",
  measurementId: "G-30MYRPQKJ6"
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage , FooterComponent]
})
export class HomePageModule {
  constructor() {
    // Initialisez Firebase
    const app = initializeApp(firebaseConfig);

    // Initialisez Firebase Analytics (facultatif)
    const analytics = getAnalytics(app);

    // Obtenez une référence à la base de données Firebase
    const database = getDatabase(app);
  }
  
}
