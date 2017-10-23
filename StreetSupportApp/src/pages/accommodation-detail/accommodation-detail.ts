import {Component} from '@angular/core';
import {NavController, NavParams, Loading, LoadingController, AlertController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {OrganisationPage} from '../organisation/organisation';
import parse from 'marked';


@Component({
  templateUrl: 'accommodation-detail.html',
})
export class AccommodationDetailPage {

  public provider: any;
  public synopsis: string;
  public accommodationId: string;
  public info = [];
  public contact = [];
  public address = [];
  public features = [];
  public requirements = [];
  public support = [];
  public loader: Loading;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public contentService: ContentProvider) {
    
    this.nav = nav;
    this.accommodationId = navParams.get('accommodationId');
  }
  
  ionViewWillEnter() {
    this.loadDetail(this.accommodationId);
  }
  
  loadDetail(accommodationId:string): any {
    this.presentLoading();

    this.contentService.findAccommodationDetails(this.accommodationId).then(data => {
      this.info = data.generalInfo;
      this.contact = data.contactInformation;
      this.address = data.address;
      this.features = data.features;
      this.requirements = data.pricingAndRequirements;
      this.support = data.supportProvided;
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
  
  organisationButtonTapped(info) {
    this.nav.push(OrganisationPage, {item: info.serviceProviderId, reload: true});
  }
}
