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
    },
    {
        path: 'add-place',
        loadChildren: () => import('./add-place/add-place.module').then( m => m.AddPlacePageModule)
    },
    {
        path: 'add-place-form',
        loadChildren: () => import('./add-place-form/add-place-form.module').then( m => m.AddPlaceFormPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class WalksPlacesRoutingModule { }
