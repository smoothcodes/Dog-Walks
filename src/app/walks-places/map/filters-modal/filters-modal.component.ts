import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(150%)'}),
        animate('350ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('350ms ease-in', style({transform: 'translateY(150%)'}))
      ])
    ])
  ]
})
export class FiltersModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
