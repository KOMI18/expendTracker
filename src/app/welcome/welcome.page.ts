import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { push , getDatabase  ,ref} from 'firebase/database';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor( private router : Router) {}
  ngOnInit() {
    
  }
  go() {
    this.router.navigate(['/login'])
   
  
      
   }
  

}
