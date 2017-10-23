import {Component} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {NavController} from 'ionic-angular';
import {EmergencyPage} from '../emergency/emergency';
import {AccommodationPage} from '../accommodation/accommodation';


@Component({
  selector: 'home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public nav: NavController,
    private iab: InAppBrowser
  ) { }

  launch(url) {
    let browser = this.iab.create(url, '_system','');
    browser.show();
  }

  emergencyItemTapped() {
    this.nav.push(EmergencyPage);
  }
  
  accommodationItemTapped() {
    this.nav.push(AccommodationPage);
  }

  servicesItemTapped() {
    this.nav.parent.select(1);
  }
}
