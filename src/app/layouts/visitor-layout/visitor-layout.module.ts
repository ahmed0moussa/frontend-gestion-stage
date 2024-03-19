import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorLayoutRoutingModule } from './visitor-layout-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VisitorLayoutRoutingModule,
    RouterModule.forRoot([
      // Define your routes here
    ])
  ]
})
export class VisitorLayoutModule { }
