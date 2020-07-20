import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {latLng, LatLngBounds, Map, MapOptions, tileLayer} from 'leaflet';
import {environment} from '../../../environments/environment';
import {Feature} from '../services/mapbox.service';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MapsServicesProviderInterface} from '../services/maps-services.provider.interface';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {MapsService} from '../services/maps.service';
import {ToastController} from '@ionic/angular';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';
import {AddPlaceService} from './add-place.service';

@Component({
    selector: 'app-add-place',
    templateUrl: './add-place.page.html',
    styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit, AfterViewInit, OnDestroy {

    accessToken = environment.accessToken;
    options: MapOptions = {
        layers: [
            tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
                id: 'mapbox/streets-v11',
                maxZoom: 20,
                accessToken: this.accessToken,
                tileSize: 512,
                zoomOffset: -1
            })
        ],
        tap: true,
        zoom: 5,
        center: latLng(52, 21),
        zoomControl: false,
    };
    map: Map;

    range: any = 100;
    places: Feature[] = [];
    placesQuery: any = '';
    inputFocues = false;
    choosenPlace: Feature = null;
    coordinates = null;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private http: HttpClient,
                @Inject('MapsServicesProviderInterface') private mapsServicesProvider: MapsServicesProviderInterface<any[]>,
                private changesRef: ChangeDetectorRef,
                private geolocation: Geolocation,
                private router: Router,
                private mapsService: MapsService,
                private toastController: ToastController,
                private addPlaceService: AddPlaceService
    ) {
        this.getPlaces = _.debounce(this.getPlaces, 600);
    }

    ngOnInit(): void {
    }


    rangeChanged(value) {
        this.changesRef.detectChanges();
    }

    getPlaces(event) {
        if (event.target.value.length > 0 && event.target.value?.toLowerCase() !== 'current location') {
            this.mapsServicesProvider.getPlaces(event.target.value)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    this.places = res;
                });

            return;
        }

        this.places = [];
    }

    onFocus(event) {
        console.log(event);
    }

    choosePlace(place: Feature) {
        this.choosenPlace = place;
        this.placesQuery = place.place_name;
        this.inputFocues = false;
        this.coordinates = {longitude: place.geometry.coordinates[1], latitude: place.geometry.coordinates[0]};
        this.map.flyTo([place.geometry.coordinates[1], place.geometry.coordinates[0]], 20);
    }

    chooseUserLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.coordinates = resp.coords;
            this.placesQuery = 'Current location';
            this.inputFocues = false;
            this.map.flyTo([resp.coords.latitude, resp.coords.longitude], 20);
        }).catch((error) => {
            this.inputFocues = false;
        });
    }

    async goToMap() {
        const location = {longitude: 0, latitude: 0};

        if (this.choosenPlace == null && this.coordinates == null) {
            const toast = await this.toastController.create({
                message: 'Choose location or use \'Discover the world\' to see the map.',
                duration: 2000,
                color: 'primary'
            });
            toast.present();
            return;
        }

        if (this.choosenPlace != null) {
            const {coordinates} = this.choosenPlace?.geometry;
            location.longitude = coordinates[0];
            location.latitude = coordinates[1];
        }

        if (this.coordinates != null) {
            const {latitude, longitude} = this.coordinates;
            location.latitude = latitude;
            location.longitude = longitude;
        }

        this.mapsService.initialCoordinates = location;
        this.mapsService.searchRange = this.range;

        this.router.navigateByUrl('/walks-places/map');
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }


    ngAfterViewInit(): void {
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }


    onMapReady(map: Map) {
        this.map = map;
    }

    forward() {
        if (!this.coordinates) {
            this.coordinates = {longitude: this.map.getCenter().lng, latitude: this.map.getCenter().lat};
            this.addPlaceService.coordinates = this.coordinates;
        }

        this.router.navigate(['/walks-places/add-place-form']);
    }
}
