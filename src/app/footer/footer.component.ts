import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged ,signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
 
}
