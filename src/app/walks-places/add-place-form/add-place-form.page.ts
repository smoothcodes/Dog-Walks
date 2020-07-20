import { Component, OnInit } from '@angular/core';
import {AddPlaceService} from '../add-place/add-place.service';

@Component({
  selector: 'app-add-place-form',
  templateUrl: './add-place-form.page.html',
  styleUrls: ['./add-place-form.page.scss'],
})
export class AddPlaceFormPage implements OnInit {

  constructor(
      private addPlaceService: AddPlaceService
  ) { }

  ngOnInit() {
  }

}
