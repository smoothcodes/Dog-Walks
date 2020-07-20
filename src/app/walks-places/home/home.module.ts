import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {Ng5SliderModule} from 'ng5-slider';
import {HttpClientModule} from '@angular/common/http';
import {MapboxService} from '../services/mapbox.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        Ng5SliderModule,
        HttpClientModule,
    ],
    declarations: [HomePage],
    providers: [
        {provide: 'MapsServicesProviderInterface', useClass: MapboxService}
    ]
})
export class HomePageModule {
}
