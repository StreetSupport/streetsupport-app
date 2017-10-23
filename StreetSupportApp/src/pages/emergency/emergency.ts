import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContentPage} from '../default-content/default-content';


@Component({
  selector: 'emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage {

  constructor(public nav: NavController) {

  }

  itemTapped(contentId) {
    this.nav.push(ContentPage, { contentId: contentId});
  }
}
