import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MapsServicesProviderInterface} from './maps-services.provider.interface';
import {Observable} from 'rxjs';

interface MapboxOutput {
    attribution: string;
    features: Feature[];
    query: [];
}

export interface Feature {
    place_name: string;
    geometry: {
        coordinates: number[]
    };
    center: number[];
}

@Injectable({
    providedIn: 'root'
})
export class MapboxService implements MapsServicesProviderInterface<Feature[]>{


    constructor(private http: HttpClient) {
    }

    getPlaces(query): Observable<Feature[]> {
        const URL = 'https://127.0.0.1:8000/api/maps/places';

        return this.http.get(URL, {
            params: {
                input: query
            }
        }).pipe(map((res: MapboxOutput) => {
            return res.features;
        }));
    }
}
