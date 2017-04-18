import { NgModule } from '@angular/core';

/* Routing Module */
import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from "../share/share.module";

/* Component */
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    UserRoutingModule,
    ShareModule
  ],
  declarations: [
    UserComponent
  ]
})
export class UserModule { }
