import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExpendPage } from './add-expend.page';
import { FooterComponent } from '../footer/footer.component';
const routes: Routes = [
  {
    path: '',
    component: AddExpendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExpendPageRoutingModule {}
