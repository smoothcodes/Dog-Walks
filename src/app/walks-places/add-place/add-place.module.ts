import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddPlacePageRoutingModule} from './add-place-routing.module';

import {AddPlacePage} from './add-place.page';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapboxService} from '../services/mapbox.service';
import {AddPlaceService} from './add-place.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPlacePageRoutingModule,
        LeafletModule
    ],
    declarations: [AddPlacePage],
    providers: [
        {provide: 'MapsServicesProviderInterface', useClass: MapboxService},
    ]
})
export class AddPlacePageModule {
}
