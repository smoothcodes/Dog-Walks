import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'walks-places',
    loadChildren: () => import('./walks-places/walks-places.module').then( m => m.WalksPlacesModule)
  },
  {
    path: '',
    redirectTo: 'walks-places',
    pathMatch: 'full'
  },
  {
    path: 'map',
    loadChildren: () => import('./walks-places/map/map.module').then( m => m.MapPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
