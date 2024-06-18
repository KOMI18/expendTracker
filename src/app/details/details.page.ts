import { Component, OnInit  , ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { onChildAdded  ,getDatabase, ref} from 'firebase/database';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @ViewChild('chart')
  chartElement!: ElementRef;
  expendFortype: {categorie: string, craated_at: Date, description: string, montant: number, userId: string}[] = []
  catName : string | null= ""
  randomColor: string = "000000";
  @ViewChild(IonModal)

  modal!: IonModal;

  constructor(public router : ActivatedRoute) { }
  // allAmount :={}
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      this.randomColor =  color;

    }
  
  }
  ngOnInit() {
        this.chart()
        this.getRandomColor
        const getDb = getDatabase()
        const us_id = sessionStorage.getItem('us_id')
        const expendType = this.router.snapshot.paramMap.get('id');
        this.catName = this.router.snapshot.paramMap.get('id')
        const refdb = ref(getDb , `/expends/${us_id}/${expendType}`);
        onChildAdded(refdb, (snapshot) => {
          const expendsFortype = snapshot.val();
          // this.expendFortype=expendsFortype;
            this.expendFortype.push({categorie: expendsFortype.categorie , craated_at : expendsFortype.craated_at , description :expendsFortype.description , montant:expendsFortype.montant, userId : expendsFortype.userId})
            console.log("expend for type ", this.expendFortype);
            
          });
            console.log(this.router.snapshot.paramMap.get('id'));
            console.log("us_id" , us_id);
  }
    cancel() {
        this.modal.dismiss(null, 'cancel');
  }
        // ngAfterViewInit
 chart(){ 
        const ctx = this.chartElement.nativeElement.getContext('2d');
        const chart = new Chart(ctx, {
          type: 'line',
          
          data: {
            
            labels: ['Epargne-Rembourssement', 'Besoin', 'Loisir'],
            datasets: [{
              data: [ 200 , 300, 150],
              backgroundColor: ['orange', 'rgb(35, 106, 144)', 'pink']
            }]
          }
        });
      }
 
  onIonInfinite(ev :Event ) {
   
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
 
}
