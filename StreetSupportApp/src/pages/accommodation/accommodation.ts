import {Component} from "@angular/core";
// import {Storage} from '@ionic/storage';
import {NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {LocationProvider} from '../../providers/location-provider';
import {AccommodationDetailPage} from '../accommodation-detail/accommodation-detail';
// import parse from 'marked';

@Component({
  templateUrl: 'accommodation.html'
})
export class AccommodationPage {

  public categoryKey: string;
  public city: any;
  public locationSearch = true;
  public category = {};
  public items = [];
  public filters = [];
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public contentService: ContentProvider,
    public locationProvider: LocationProvider) {

    this.categoryKey = navParams.get('category');
  }

  ionViewWillEnter() {
    this.locationProvider.getCurrentCity().then(city => {
      if (this.city === undefined || this.city.name !== city.name) {
        this.city = city;
        this.loadServices(city.id);
      }
    });
  }

  loadServices(cityId) {
    this.presentLoading();
    console.log(this.filters);
    this.contentService.findAccommodationServices(this.categoryKey, cityId, this.locationSearch, this.filters).then(data => {
      this.items = data.services.items;
      if (this.locationSearch == true && data.locationEnabled == false) {
        this.locationSearch = false;
      }
      this.loader.dismissAll();
    }).catch(error => {
      this.loader.dismissAll();
      let alert = this.alertCtrl.create({
        title: 'API Error',
        subTitle: 'could not get data at this time. Please try again later.',
        buttons: ['Ok']
      });
      alert.present();
    });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  itemTapped(item) {
    this.nav.push(AccommodationDetailPage, { accommodationId: item.id, reload: true });
  }

  locationChanged(city) {
    this.city = city;
    this.loadServices(city.id);
  }

  useMyLocationTapped() {
    this.locationSearch = !this.locationSearch;
    this.loadServices(this.city.id);
  }
  
  updateFiltersTapped() {
    this.filters['hasDisabledAccess'] = true;
    this.loadServices(this.city.id);
  }
}
