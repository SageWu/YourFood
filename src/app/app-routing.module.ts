import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'place', loadChildren: './place/place.module#PlaceModule' },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: 'saler', loadChildren: './saler/saler.module#SalerModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}