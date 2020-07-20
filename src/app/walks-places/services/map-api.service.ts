import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import * as L from 'leaflet';
import {latLng} from 'leaflet';
import {environment} from '../../../environments/environment';

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
        return this.http.get(`${environment.apiUrl}/api/place`, {
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

    getMarkerById(id: string, startLat?: string, startLong?: string): Observable<PointResponse> {
        let params;
        if (!startLat || !startLong) {
            params = {};
        } else {
            params = {
                startLat,
                startLong
            };
        }

        return this.http.get<PointResponse>(`${environment.apiUrl}/api/place/${id}`, {
            params
        });
    }

    set loading(value) {
        this.isLoading$.next(value);
    }
}
