import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-map-button',
    templateUrl: './map-button.component.html',
    styleUrls: ['./map-button.component.scss'],
})
export class MapButtonComponent implements OnInit {

    @Output() filtersButtonClicked = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    filtersClicked() {
      this.filtersButtonClicked.emit(true);
    }

}
