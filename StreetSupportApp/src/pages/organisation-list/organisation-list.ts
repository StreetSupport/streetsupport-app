import {Component} from "@angular/core";
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {LocationProvider} from '../../providers/location-provider';
import {OrganisationPage} from '../organisation/organisation';
import {ClientGroupFilter} from '../../pipes/filter-by-client-group';

interface ClientGroupType {
  key: string
  name: string
  sortPosition: number
}

@Component({
  templateUrl: 'organisation-list.html'
})
export class OrganisationListPage {

  public providers: any;
  public loader: Loading;
  public cityName: string;
  public clientGroupTypes: ClientGroupType[];
  public clientGroupFilter: ClientGroupFilter;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public contentProvider: ContentProvider,
    public locationProvider: LocationProvider) { }

  ionViewWillEnter() {
    this.locationProvider.getCurrentCity().then(city => {
      if (this.cityName !== city.name) {
        this.cityName = city.name;
        this.loadProviders(city.id);
      }
    });
  }

  itemTapped(event, provider) {
    this.nav.push(OrganisationPage, { item: provider.key });
  }

  locationChanged(city) {
    this.cityName = city.name;
    this.loadProviders(city.id);
  }

  filterToggled(filterList) {
    this.clientGroupFilter = {filterTypes: filterList};
  }

  private loadProviders(cityId) {
    this.presentLoading();

    this.contentProvider.findOrganisations(cityId).then(data => {
      this.clientGroupTypes = this.discoverClientGroupTypes(data);       
      this.providers = data;
      this.loader.dismiss();
    });
  }

  private presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }

  private discoverClientGroupTypes(data): ClientGroupType[] {
    // use dictionary to capture distinct client groups
    let clientGroups: { [key: string]: ClientGroupType } = {};
    data.filter(item => item.clientGroups).reduce((clientGroups, item) => {
      item.clientGroups.forEach(
        clientGroup => clientGroups[clientGroup.key] = clientGroup
      );
      return clientGroups;
    }, clientGroups);

    // return the values from the dictionary, can use Object.values() if upgrading to es2017 or beyond
    return Object.keys(clientGroups).map(e => clientGroups[e]);
  }
}
