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
  uniiqueRef : any  ;
  tab:{categorie: string ; created_at:string ,description:string; montant:number; userId :string }[] = []
  showExpend : boolean = !false
  @ViewChild(IonModal)
  modal!: IonModal;
  name: string = "" ;
  currentUser : any ;
  email : any ;
  allCategorie: any[] = [];
  allExpend: any [] = [];
  // totalExpend : number = 0 ;
  // @ViewChild('chart') chartElement!: ElementRef;
  // public chartInstance: any;
  // expendForBesoin : number = 0;
  // expendForLoisir : number = 0
  // expendForembourssement : number = 0

  @ViewChild('chart') chartElement!: ElementRef;
  public chartInstance: any;

  public expendForBesoin = 0;
  public expendForLoisir = 0;
  public expendForembourssement = 0;
  public totalExpend = 0;

  private isBesoinLoaded = false;
  private isLoisirLoaded = false;
  private isEpargneLoaded = false;

  ngOnInit() {
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
      const us_id = sessionStorage.getItem('us_id');
      const database = getDatabase();
      const nodeRefExpBesoin = ref(database, `/expends/${us_id}/Besoin`);
      const nodeRefExpEpargne = ref(database, `/expends/${us_id}/Epargne-Rembourssement`);
      const nodeRefExpLoisir = ref(database, `/expends/${us_id}/Envie-Loisir`);
     
       this.getData(nodeRefExpLoisir, "Envie-Loisir");
       this.getData(nodeRefExpBesoin, 'Besoin');
       this.getData(nodeRefExpEpargne, 'Epargne-Rembourssement');
    } catch (error) {
      console.error(error);
    }
  }

  getData(nodeRef: any, category: string) {
    onChildAdded(nodeRef, (snapshot) => {
      const allExpend = snapshot.val();
      for (let expend in allExpend) {
        if (expend === "montant") {
          if (category === 'Besoin') {
            this.expendForBesoin += allExpend.montant;
            this.totalExpend += this.expendForBesoin;
            
          } else if (category === "Envie-Loisir") {
            this.expendForLoisir += allExpend.montant;
            this.totalExpend += allExpend.montant;

          } else if (category === 'Epargne-Rembourssement') {
            this.expendForembourssement += allExpend.montant;
            this.totalExpend += this.expendForembourssement;
            

          }
        }
        
      }

      // this.updateLoadingStatus(category);
      this.initializeChart(100000 , 150000 , 200000);
     
    });
   
  }


  initializeChart(ep: number, bs: number, ls: number) {
    const ctx = this.chartElement.nativeElement.getContext('2d');
    this.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Epargne-Rembourssement', 'Besoin', 'Loisir'],
        datasets: [{
          data: [ep, bs, ls],
          backgroundColor: ['orange', 'rgb(35, 106, 144)', 'pink']
        }]
      }
    });
  }

  details(category: string) {
    console.log('Category:', category);
  }
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
 

//  ngOnInit() {
  
//   const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // L'utilisateur est connecté
//         this.currentUser = user;
//         console.log('Utilisateur connecté :', this.currentUser);
//         this.name = ""+user.displayName
//       } else {
//         // Aucun utilisateur n'est connecté
//         console.log('Aucun utilisateur connecté');
//         this.router.navigate(['/login'])
//       }
//     });
//       try {
//         interface User{
//           montant : number ;
//           categorie : string;
//         }
//          const us_id = sessionStorage.getItem('us_id');
//          const database = getDatabase()
//          const nodeRefExpBesoin = ref( database  ,`/expends/${us_id}/Besoin`)
//          const nodeRefExpEpargne = ref( database  ,`/expends/${us_id}/Epargne-Rembourssement`)
//          const nodeRefExpLoisir = ref( database  ,`/expends/${us_id}/Envie-Loisir`)
//       onChildAdded(nodeRefExpBesoin, (snapshot) => {
           
//             const allExpend = snapshot.val()
//             console.log(allExpend);
//             for(let expend in allExpend){
//                if(expend === "montant"){
//                   this.expendForBesoin += allExpend.montant
//                   this.totalExpend+=this.expendForBesoin 
//                   console.log("allexpend for besoin" , this.expendForBesoin);
//                   console.log("normalement ceci doit etre executer en premier " + this.expendForBesoin);
//                   this.charts(this.expendForembourssement , this.expendForBesoin , this.expendForLoisir)

//                 }
              
//             }
//           });
//           onChildAdded(nodeRefExpLoisir, (snapshot) => {
           
//             const allExpend = snapshot.val()
//             console.log(allExpend);
//             for(let expend in allExpend){
//                if(expend === "montant"){
//                   this.expendForLoisir += allExpend.montant
//                   this.totalExpend+=this.expendForLoisir
                  
//                   console.log("allexpend for besoin" , this.expendForLoisir);

//                 }
               
//             }
//           });
//           onChildAdded(nodeRefExpEpargne, (snapshot) => {
           
//             const allExpend = snapshot.val()
//             console.log(allExpend);
//             for(let expend in allExpend){
//                if(expend === "montant"){
//                   this.expendForembourssement+= allExpend.montant
//                   this.totalExpend+=this.expendForembourssement

//                   console.log("allexpend for rembourssement" , this.expendForembourssement);
//                 }
               
//             }

//           });
         
//       } catch (error) {
//         console.error(error);
                
//       }

// }
// // ngAfterViewInit
// charts(ep:number , bs:number , ls:number){ 
//   console.log('ici le graphe doit etre initialiser avec les valeur suivante ' + this.expendForBesoin);
  
//   const ctx = this.chartElement.nativeElement.getContext('2d');
//   const chart = new Chart(ctx, {
//     type: 'doughnut',
    
//     data: {
      
//       labels: ['Epargne-Rembourssement', 'Besoin', 'Loisir'],
//       datasets: [{
//         data: [ ep, bs, ls],
//         backgroundColor: ['orange', 'rgb(35, 106, 144)', 'pink']
//       }]
//     }
//   });

// }

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
addExpend(){
    this.router.navigate(['/add-expend'])
}
archive(){
  console.log( "this.allExpend" , this.allExpend);
}
cancel() {
    this.modal.dismiss(null, 'cancel');
}
  // details(key : any){
  //   this.router.navigate([`/details/${key}`])
  // }
  
}

function onContentScroll(event: Event | undefined) {
  throw new Error('Function not implemented.');
}

