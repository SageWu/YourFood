import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Style Module */
import { MaterialModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

/* Component */
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';

/* Routing Module */
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    
    MaterialModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    LocationComponent
  ]
})
export class HomeModule { }
