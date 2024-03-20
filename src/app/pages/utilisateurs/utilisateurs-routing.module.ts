import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListjsComponent } from './listjs/listjs.component';

const routes: Routes = [
  {
    path: '',
    component: ListjsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursRoutingModule { }
