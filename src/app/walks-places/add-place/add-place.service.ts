import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddPlaceService {

    private readonly _coordinates = new BehaviorSubject({longitude: undefined, latitude: undefined});
    readonly coordinates$ = this._coordinates.asObservable();

    constructor() {
    }

    set coordinates(value: { longitude, latitude }) {
        this._coordinates.next(value);
    }

    get coordinates() {
        return this._coordinates.getValue();
    }
}
