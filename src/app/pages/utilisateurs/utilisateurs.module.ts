import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';
// component


// Ng Search 
import { NgPipesModule } from 'ngx-pipes';
import { ListjsComponent } from './listjs/listjs.component';

// Sorting page

import { NgbdListSortableHeader } from './listjs/listjs-sortable.directive';

@NgModule({
  declarations: [
    ListjsComponent,
    NgbdListSortableHeader,
    NgbdListSortableHeader
  ],
  imports: [
    CommonModule,
    UtilisateursRoutingModule,
    SharedModule,
    PaginationModule.forRoot(),
    NgPipesModule,
    BsDatepickerModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    SimplebarAngularModule,
    BsDropdownModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UtilisateursModule { }
