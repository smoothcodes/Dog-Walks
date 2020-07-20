import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, ViewChild} from '@angular/core';
import {Options} from 'ng5-slider';
import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {Feature, MapboxService} from '../services/mapbox.service';
import {MapsServicesProviderInterface} from '../services/maps-services.provider.interface';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {MapsService} from '../services/maps.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
    range: any = 100;
    options: Options = {
        floor: 0,
        ceil: 200,
        showSelectionBar: true,
        draggableRange: true,
        onlyBindHandles: true
    };

    places: Feature[] = [];
    placesQuery: any = '';
    inputFocues = false;
    choosenPlace: Feature = null;
    coordinates = null;

    destroy$: Subject<boolean> = new Subject<boolean>();

    ngAfterViewInit(): void {

    }

    constructor(private http: HttpClient,
                @Inject('MapsServicesProviderInterface') private mapsServicesProvider: MapsServicesProviderInterface<any[]>,
                private changesRef: ChangeDetectorRef,
                private geolocation: Geolocation,
                private router: Router,
                private mapsService: MapsService,
                private toastController: ToastController
                ) {
        this.getPlaces = _.debounce(this.getPlaces, 600);
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
        console.log(place);
    }

    chooseUserLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.coordinates = resp.coords;
            this.placesQuery = 'Current location';
            this.inputFocues = false;
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


}
