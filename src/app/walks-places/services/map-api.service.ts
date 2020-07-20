import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import * as L from 'leaflet';
import {latLng} from 'leaflet';

export interface AllPlacesResponse {
    id: string;
    longitude: number;
    latitude: number;
}

export interface PointResponse {
    id: string;
    name: string;
    description: string;
    photos?: string[];
    directions?: number[][];
    distance?: number;
    duration?: number;
    longitude: number,
    latitude: number;
}

@Injectable({
    providedIn: 'root'
})
export class MapApiService {

    readonly isLoading$ = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
    }

    getMarkers(latFrom: string,
               latTo: string,
               longFrom: string,
               longTo: string,
               markerAction = null): Observable<AllPlacesResponse[]> {
        this.isLoading$.next(true);
        return this.http.get('https://127.0.0.1:8000/api/place', {
            params: {
                latFrom,
                latTo,
                longFrom,
                longTo
            }
        }).pipe(map((res: AllPlacesResponse[]) => {
            this.isLoading$.next(false);
            return res;
        }));
    }

    getMarkerById(id: string, startLat: string = null, startLong: string = null): Observable<PointResponse> {
        return this.http.get<PointResponse>(`https://127.0.0.1:8000/api/place/${id}`, {
            params: {
                startLat,
                startLong
            }
        });
    }

    set loading(value) {
        this.isLoading$.next(value);
    }
}
