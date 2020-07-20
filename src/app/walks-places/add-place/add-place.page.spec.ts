import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPlacePage } from './add-place.page';

describe('AddPlacePage', () => {
  let component: AddPlacePage;
  let fixture: ComponentFixture<AddPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
