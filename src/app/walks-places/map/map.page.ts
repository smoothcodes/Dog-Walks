import {
    AfterViewInit,
    ChangeDetectorRef,
    Component, ComponentFactory,
    ComponentFactoryResolver, ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import * as L from 'leaflet';
import {DivIcon, latLng, LatLngBounds, Map, MapOptions, marker, polyline, tileLayer} from 'leaflet';
import {MapsService} from '../services/maps.service';
import {HttpClient} from '@angular/common/http';
import {MapApiService, PointResponse} from '../services/map-api.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import * as _ from 'lodash';
import {PlaceCardComponent} from './place-card/place-card.component';
import {FiltersModalComponent} from './filters-modal/filters-modal.component';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MapPage implements OnInit, AfterViewInit {

    accessToken = environment.accessToken;
    private map: Map;
    options: MapOptions = {
        layers: [
            tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
                id: 'mapbox/streets-v11',
                maxZoom: 20,
                accessToken: this.accessToken,
                tileSize: 512,
                zoomOffset: -1,
            })
        ],
        tap: true,
        zoom: 5,
        center: latLng(52, 21),
        zoomControl: false,
    };
    markers: L.Marker[] = [];
    clusterOptions = {
        spiderfyOnMaxZoom: true,
        zoomToBoundsOnClick: true
    };
    mapBounds: LatLngBounds;
    userLocation: { latitude: number, longitude: number };
    userMarker;
    selectedMarker;
    routeToPoint;
    filters = [];

    pointComponentRef: ComponentRef<PlaceCardComponent>;
    filtersComponentRef: ComponentRef<FiltersModalComponent>;
    @ViewChild('cardContainer', {read: ViewContainerRef}) cardContainer;
    @ViewChild('filtersContainer', {read: ViewContainerRef}) filtersContainer;

    constructor(private mapService: MapsService,
                private http: HttpClient,
                private mapsApi: MapApiService,
                private geolocation: Geolocation,
                private changeDetectionRef: ChangeDetectorRef,
                private resolver: ComponentFactoryResolver) {
        this.loadMarkers = _.debounce(this.loadMarkers, 500);
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.map.invalidateSize();
            const bounds: LatLngBounds = this.map.getBounds();
            this.localizeUser();
            this.mapService.initialCoordinates$
                .subscribe((coords) => {
                    if (coords.latitude != undefined) {
                        this.map.flyTo(latLng(coords.latitude, coords.longitude), 10);
                    }
                });
        }, 100);
    }


    onMapReady(map: Map) {
        this.map = map;
        this.loadMarkers();

    }

    loadMarkers() {
        this.mapBounds = this.map.getBounds();
        this.mapsApi.getMarkers(
            this.mapBounds.getSouthWest().lat.toString(),
            this.mapBounds.getNorthEast().lat.toString(),
            this.mapBounds.getSouthWest().lng.toString(),
            this.mapBounds.getNorthEast().lng.toString()
        ).subscribe((res) => {
            this.markers = res.map((place) => {

                return new L.Marker(latLng(place.latitude, place.longitude), {
                    // @ts-ignore
                    id: place.id,
                    icon: L.icon({
                        iconUrl: 'assets/svg/pin.svg',
                        shadowUrl: null,
                        iconSize: [41, 41]
                    })
                }).on('touch', (e) => {
                    this.chooseMarker(e);
                }).on('click', (e) => {
                    this.chooseMarker(e);
                }).on('contextmenu', (e) => {
                    this.chooseMarker(e);
                }).on('tap', (e) => {
                    this.chooseMarker(e);
                });
            });
        });
    }

    chooseMarker(e) {
        if (this.routeToPoint != undefined) {
            this.map.removeLayer(this.routeToPoint);
        }


        this.mapsApi.loading = true;
        const {id} = e.target.options;
        this.mapsApi.getMarkerById(id, this.userLocation?.latitude.toString(), this.userLocation?.longitude.toString())
            .subscribe((pointResponse) => {
                if (pointResponse.directions) {
                    this.routeToPoint = polyline(pointResponse.directions.map((point) => {
                        return latLng(point[1], point[0]);
                    }), {
                        className: 'route-to-point'
                    });
                    this.map.addLayer(this.routeToPoint);
                }
                this.selectedMarker = pointResponse;
                this.showPointCard(this.selectedMarker);
                this.changeDetectionRef.detectChanges();
                this.mapsApi.loading = false;
            });
    }

    localizeUser() {
        this.geolocation.getCurrentPosition()
            .then((res) => {
                const {latitude, longitude} = res.coords;
                const location = latLng(latitude, longitude);
                this.userLocation = {latitude, longitude};
                this.userMarker = [marker(location, {
                    icon: new DivIcon({
                        className: 'user-location-marker',
                        iconSize: [40, 40],
                        iconAnchor: [20, 40],
                        html: '<div class="user-location-pulse"></div>'
                    })
                })];
            });
    }

    moveToUserLocation() {
        if (this.userLocation) {
            this.map.flyTo(latLng(this.userLocation.latitude, this.userLocation.longitude), 14);
        }
        // this.map.zoomIn(10);
    }

    showFilters() {
        this.filtersContainer.clear();
        const factory: ComponentFactory<FiltersModalComponent> = this.resolver.resolveComponentFactory(FiltersModalComponent);
        this.filtersComponentRef = this.filtersContainer.createComponent(factory);
        // (this.filtersComponentRef.instance) = point;
    }

    showPointCard(point: PointResponse) {
        this.cardContainer.clear();
        const factory: ComponentFactory<PlaceCardComponent> = this.resolver.resolveComponentFactory(PlaceCardComponent);
        this.pointComponentRef = this.cardContainer.createComponent(factory);
        (this.pointComponentRef.instance).point = point;
    }

    closeCards() {
        if (!this.filtersComponentRef && !this.pointComponentRef) {
            return;
        }
        this.filtersComponentRef = undefined;
        this.pointComponentRef = undefined;

        this.cardContainer.clear();
        this.filtersContainer.clear();
        if (this.routeToPoint != undefined) {
            this.map.removeLayer(this.routeToPoint);
        }
    }
}
