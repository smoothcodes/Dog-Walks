import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalksPlacesRoutingModule} from './walks-places.routing.module';
import {WalksPlacesComponent} from './walks-places.component';
import {MapsService} from './services/maps.service';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [WalksPlacesComponent],
    imports: [
        CommonModule,
        WalksPlacesRoutingModule,
        IonicModule
    ],
    providers: [
        MapsService
    ]
})
export class WalksPlacesModule {
}
