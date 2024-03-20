import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeRoutingModule } from './home-routing.module';
import { PostesStageComponent } from './postes-stage/postes-stage.component';
import { DescriptionStageComponent } from './description-stage/description-stage.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PostesStageComponent
    ,DescriptionStageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
