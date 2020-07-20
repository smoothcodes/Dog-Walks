import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPlaceFormPage } from './add-place-form.page';

describe('AddPlaceFormPage', () => {
  let component: AddPlaceFormPage;
  let fixture: ComponentFixture<AddPlaceFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlaceFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlaceFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
