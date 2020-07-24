import {Component, OnInit} from '@angular/core';
import {AddPlaceService} from '../add-place/add-place.service';
import {MapApiService} from '../services/map-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MapsService} from '../services/maps.service';

@Component({
    selector: 'app-add-place-form',
    templateUrl: './add-place-form.page.html',
    styleUrls: ['./add-place-form.page.scss'],
})
export class AddPlaceFormPage implements OnInit {

    placeForm: FormGroup;
    filesContent = [];

    constructor(
        private addPlaceService: AddPlaceService,
        private mapsApiService: MapApiService,
        private mapsService: MapsService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.placeForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]]
        });
    }

    handleFileUpload(event) {
        const files = event.target.files;

        files.forEach((file, key) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.filesContent.push(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }

    addPlace() {
        const data = this.placeForm.getRawValue();
        data.photos = this.filesContent;
        data.longitude = this.addPlaceService.coordinates.longitude;
        data.latitude = this.addPlaceService.coordinates.latitude;

        this.mapsApiService.addPlace(data)
            .subscribe(res => {
                this.mapsService.markers = [res, ...this.mapsService.markers];
            });
    }

}
