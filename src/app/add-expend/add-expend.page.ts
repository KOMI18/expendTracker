import { Component, OnInit } from '@angular/core';
import { FirebaseError } from 'firebase/app';
import { getDatabase , ref ,push, set , child } from 'firebase/database';
@Component({
  selector: 'app-add-expend',
  templateUrl: './add-expend.page.html',
  styleUrls: ['./add-expend.page.scss'],
})
export class AddExpendPage implements OnInit {
  categorie : string = ""
  montant : string = ""
  description : string = ""
  errorMessage : string = ""
  message : string = ""
  loading : boolean = false ;
  couleur : string = ""
  image : string = ""
  userId : string =""+sessionStorage.getItem('us_id')
  
  constructor() { }

  ngOnInit() {
  }

  saveExpend(){
    
    this.loading = true ;
    if(this.categorie == "" || this.description=="" || this.montant=="" || this.montant== "0"){
      this.errorMessage = "Remplisser les champs correctement"
      this.loading = false
      setTimeout(() => {
        this.errorMessage = ""
        
      }, 7000);
   
    }else{ 
 

   
    
    const database = getDatabase();
    const nodeRef = ref(database, `/expends/${this.userId}/${this.categorie}`); // Spécifiez le chemin de votre nœud
    var date = new Date();

    // Get year, month, and day part from the date
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "2-digit" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const formatDate = year + "-" + month + "-" + day
  
    const expendData = 
      {
        categorie: this.categorie,
        montant: this.montant,
        description: this.description,
        userId : this.userId,
        created_at : formatDate
      }
    
    
    //  Utilisez la méthode push() pour enregistrer les données dans le nœud
    push(nodeRef, expendData)
      .then(() => {
        console.log('Depense enregistrer' + this.montant);
        if(this.message = "Dépense enregistré"){
           this.loading = false ;
           this.message = "Dépense enregistré"
           setTimeout(() => {
            this.message = ""
            this.categorie = ""
            this.description = ""
            this.montant = ""
          }, 7000);
        }
      })
      .catch((error) => {
        if (error instanceof FirebaseError) {
           this.errorMessage = error.message
           setTimeout(() => {
            this.errorMessage = ""
           
          }, 7000);
          this.loading = false ;
        }
      
       
       
        
      });
   
  }
}
}