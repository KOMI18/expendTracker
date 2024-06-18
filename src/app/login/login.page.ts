import { Component, ViewChild, ElementRef  , OnInit, viewChild } from '@angular/core';
import {Router} from '@angular/router' ;
import { getAuth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
UserName :string = "" ;
passwordInput : string ="";
loading: boolean = false;
errorMessage : string = ""

  constructor(private router:Router ,  public afAuth : AngularFireAuth ) {                                                                                                         }

  ngOnInit() {
  }
  singUpme(){
    this.router.navigate(['/register']);
 }

 showErrorMessage(errorMessage: string) {
  this.errorMessage = errorMessage;
  setTimeout(() => {
    this.errorMessage = '';
    this.UserName = ''
    this.passwordInput = ''
  }, 7000); // 1000 millisecondes = 1 seconde
}
 async logMeIn(){
  // code pour la connexion de l'utilisateur
  this.loading = true;
const auth = getAuth();
      await signInWithEmailAndPassword(auth, this.UserName, this.passwordInput)
    .then((userCredential) => {
      // User registration successful
      this.router.navigate(['/home'])
      console.log('User registered:', userCredential.user);
      sessionStorage.setItem('us_id' , userCredential.user.uid)
      sessionStorage.setItem('email' , this.UserName)
      console.log( encodeURI(this.UserName));
      this.loading = false
      this.UserName=''
      this.passwordInput=''
  })
  .catch((error) => {
  console.error('Sing in  error:', error);
  if (error instanceof FirebaseError) {
    console.log(error.message); // Affiche le message d'erreur
    if(error.message == "Firebase: The email address is badly formatted. (auth/invalid-email)."){
        this.errorMessage="Mauvais format d'email"
    }else if(error.message=="Firebase: A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred. (auth/network-request-failed)."){
      this.errorMessage = " A network AuthError"
    }else{
      this.errorMessage=error.message
    }
    
    this.showErrorMessage(this.errorMessage)
    this.loading = false
 }
 
});

}
 

}
