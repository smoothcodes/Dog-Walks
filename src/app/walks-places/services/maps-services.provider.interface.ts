import {Observable} from 'rxjs';

export interface MapsServicesProviderInterface<T> {
    getPlaces(query: string): Observable<T>;
}
