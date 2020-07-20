import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MapsService {

    // tslint:disable-next-line:variable-name
    private readonly _initialCoordinates = new BehaviorSubject({longitude: undefined, latitude: undefined});
    readonly initialCoordinates$ = this._initialCoordinates.asObservable();

    // tslint:disable-next-line:variable-name
    private readonly _searchRange = new BehaviorSubject(undefined);
    readonly searchRange$ = this._searchRange.asObservable();

    // tslint:disable-next-line:variable-name
    private readonly _markers = new BehaviorSubject([]);
    readonly markers$ = this._markers.asObservable();

    constructor() {
    }

    set initialCoordinates(value: { longitude: number, latitude: number }) {
        this._initialCoordinates.next(value);
    }

    get initialCoordinates() {
        return this._initialCoordinates.getValue();
    }

    set searchRange(range: number) {
        this._searchRange.next(range);
    }

    get searchRange() {
        return this._searchRange.getValue();
    }

    set markers(markers: any) {
        this._markers.next(markers);
    }

    get markers() {
        return this._markers.getValue();
    }
}
