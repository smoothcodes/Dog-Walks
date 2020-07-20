import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MapPageRoutingModule} from './map-routing.module';

import {MapPage} from './map.page';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {MapButtonComponent} from './map-button/map-button.component';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {PlaceCardComponent, SafeHtmlPipe} from './place-card/place-card.component';
import {GalleryComponent} from './place-card/gallery/gallery.component';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import {FiltersModalComponent} from './filters-modal/filters-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MapPageRoutingModule,
        LeafletModule,
        LeafletMarkerClusterModule,
    ],
    declarations: [
        MapPage,
        MapButtonComponent,
        PlaceCardComponent,
        SafeHtmlPipe,
        GalleryComponent,
        FiltersModalComponent
    ],
    entryComponents: [
        PlaceCardComponent,
        FiltersModalComponent
    ],
    exports: [
        PlaceCardComponent,
        FiltersModalComponent
    ],
    providers: [
        LaunchNavigator
    ]
})
export class MapPageModule {
}
