import { Component, ViewChild , ElementRef } from '@angular/core';
import {Router} from "@angular/router" ;
import { getDatabase, push , ref, set , onValue , onChildAdded , child } from "firebase/database"
import { Chart } from 'chart.js/auto';
import { getAuth, onAuthStateChanged ,signOut } from 'firebase/auth';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage {
  isFooterHidden: boolean = false;
  lastScrollTop: number = 0;

  @ViewChild('chart')  chartElement!: ElementRef;

  @ViewChild(IonModal)
  modal!: IonModal;
  name: string = "" ;
  currentUser : any ;
  email : any ;
  allCategorie: any[] = [];
  allExpend: any [] = [];
  totalExpend : number = 0 ;
  expendForBesoin : number = 0;
  expendForLoisir : number = 0
  expendForembourssement : number = 0
  uniiqueRef : any  ;
  tab:{categorie: string ; created_at:string ,description:string; montant:number; userId :string }[] = []

  showExpend : boolean = !false
  handleRefresh(event: { target: { complete: () => void; }; }) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
      window.location.reload()
    }, 2000);
  }

  constructor( private router : Router ) {}
  sumMontantPerCategorie(cat: { categorie: string;}){
        let sum = 0
        for(let pr of this.allExpend){
          if(cat.categorie === pr.categorie){
            sum+=pr.montant

          }
        }
       
        return sum ;
  }
  onScroll() {
    const scrollTop = window.screenY;

    if (scrollTop > this.lastScrollTop) {
      // Scrolling down
      this.isFooterHidden = true;
    } else {
      // Scrolling up
      this.isFooterHidden = false;
    }
    
    this.lastScrollTop = scrollTop;
    console.log(scrollTop);
    
    
  }
 ngOnInit() {

 
  // this.chrt(this.expendForembourssement,this.expendForBesoin, this.expendForLoisir); 
 
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté
        this.currentUser = user;
        console.log('Utilisateur connecté :', this.currentUser);
        this.name = ""+user.displayName
      } else {
        // Aucun utilisateur n'est connecté
        console.log('Aucun utilisateur connecté');
        this.router.navigate(['/login'])
      }
    });
      try {
        interface User{
          montant : number ;
          categorie : string;
        }
         const us_id = sessionStorage.getItem('us_id');
         const database = getDatabase()
         const nodeRefExpBesoin = ref( database  ,`/expends/${us_id}/Besoin`)
         const nodeRefExpEpargne = ref( database  ,`/expends/${us_id}/Epargne-Rembourssement`)
         const nodeRefExpLoisir = ref( database  ,`/expends/${us_id}/Envie-Loisir`)

        onChildAdded(nodeRefExpBesoin, (snapshot) => {
           
            const allExpend = snapshot.val()
            console.log(allExpend);
            for(let expend in allExpend){
               if(expend === "montant"){
                  this.expendForBesoin += allExpend.montant
                  this.totalExpend+=this.expendForBesoin 
                  console.log("allexpend for besoin" , this.expendForBesoin);
                }
              
            }
          });
          onChildAdded(nodeRefExpLoisir, (snapshot) => {
           
            const allExpend = snapshot.val()
            console.log(allExpend);
            for(let expend in allExpend){
               if(expend === "montant"){
                  this.expendForLoisir += allExpend.montant
                  this.totalExpend+=this.expendForLoisir

                  console.log("allexpend for  besoin" , this.expendForBesoin);
                }
               
            }
          });
          onChildAdded(nodeRefExpEpargne, (snapshot) => {
           
            const allExpend = snapshot.val()
            console.log(allExpend);
            for(let expend in allExpend){
               if(expend === "montant"){
                  this.expendForembourssement+= allExpend.montant
                  this.totalExpend+=this.expendForembourssement

                  console.log("allexpend for rembourssement" , this.expendForembourssement);
                }
               
            }

          });
          
      } catch (error) {
        console.error(error);
                
      }
      
     
    }
 
      async logout() {
        try {
          const auth = getAuth();
          await signOut(auth);
          console.log('Déconnexion réussie');
          this.router.navigate(['./login'])
        
        
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error);
        }
      }
    setColor(){
      
    }
   addExpend(){
    this.router.navigate(['/add-expend'])
   
   }
   archive(){
  console.log( "this.allExpend" , this.allExpend);
       
     
   }
   cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  details(key : any){
    this.router.navigate([`/details/${key}`])
  }
  // ngAfterViewInit
  ngAfterViewInit(ep:number , bs:number , ls:number){ 
    const ctx = this.chartElement.nativeElement.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      
      data: {
        
        labels: ['Epargne-Rembourssement', 'Besoin', 'Loisir'],
        datasets: [{
          data: [ ep, bs, ls],
          backgroundColor: ['orange', 'rgb(35, 106, 144)', 'pink']
        }]
      }
    });
  
}
}
function onContentScroll(event: Event | undefined) {
  throw new Error('Function not implemented.');
}

