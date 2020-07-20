import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule )
    },
    {
        path: 'map',
        loadChildren: () => import('./map/map.module').then( m => m.MapPageModule )
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class WalksPlacesRoutingModule { }
