import { Component, OnInit } from '@angular/core';
import { getDatabase, push, ref, set , onValue , onChildAdded } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name : string = "";
  email : string = "";
  password : string = "";
  loading: boolean = false ;
  instruction : string = "";
  errorMessage :string = "";
  budget : string = "" ;
  constructor(private router :Router , public afAuth : AngularFireAuth) { }
  showInstruction() {
    this.instruction = "Apres la creation de votre compte vous serez redireger vers la page de connexion" ;
    setTimeout(() => {
      this.instruction = ""
      this.errorMessage = ""
    }, 7000); // 1000 millisecondes = 1 seconde
  }
  ngOnInit() {}
  login(){
    this.router.navigate(['/login'])
  }
  async registe(){
      // code pour la connexion de l'utilisateur
      this.loading = true ;
      this.showInstruction()
  const auth = getAuth();
      await  createUserWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
      const users = userCredential.user;   
      
      updateProfile(users  , {
        displayName: this.name, 
        photoURL: this.email
      })
        .then(()=>{
            console.log("Donner de l'utilisateur mis a jour");
            
        })
        .catch(() =>{
          console.error('Une erreur est survenu');
          

        })
      // User registration successful
      console.log('User registered:', userCredential.user);
      
      sessionStorage.setItem('name' , this.name)
      this.router.navigate(['/login'])
     const db = getDatabase()
     const refUser  = ref(db , `/users/${userCredential.user.uid}`)
     const userDate = {
        nom : this.name,
        email : this.email,
        budget : this.budget,
        userid : userCredential.user.uid
     }
     push(refUser , userDate)
     .then(()=>{
          console.log("Utilisateur enregistrer");
          
     }).catch((error)=>{
          console.error(error);
          
     })
    })
    .catch((error) => {
      console.error('Registration error:', error);
      if (error instanceof FirebaseError) {
        this.errorMessage = error.message
        this.loading = false
     }
    });

  }
}
