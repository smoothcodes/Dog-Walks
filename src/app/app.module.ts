import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Ng5SliderModule} from 'ng5-slider';
import {HttpClientModule} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddPlaceService} from './walks-places/add-place/add-place.service';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot({mode: 'ios'}), AppRoutingModule, HttpClientModule, BrowserAnimationsModule],
    providers: [
        StatusBar,
        SplashScreen,
        Ng5SliderModule,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Geolocation,
        AddPlaceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
