import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/* Material Module profill */
import 'hammerjs';
import { ChartsModule } from "ng2-charts";

/* Component */
import { AppComponent } from './app.component';

/* Feture Module */
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ChartsModule,
    
    AppRoutingModule,
    CoreModule,
    HomeModule,
    UserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
