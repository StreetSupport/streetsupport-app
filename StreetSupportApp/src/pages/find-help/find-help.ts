import {Component} from "@angular/core";
import {NavController, Loading, LoadingController} from 'ionic-angular';
import {ContentProvider} from '../../providers/content-provider';
import {HelpCategoryPage} from '../help-category/help-category';
import {TimetabledCategoryPage} from '../timetabled-category/timetabled-category';


@Component({
  templateUrl: 'find-help.html'
})
export class FindHelpPage {

  public categories: any;
  public loader: Loading;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public contentProvider: ContentProvider) {

    this.presentLoading();
    this.contentProvider.findServiceCategories().then(data => {
      this.categories = data;
      this.loader.dismiss();
    });
  }

  itemTapped(event, category) {
    if (category.key === 'dropin' || category.key === 'meals') {
      this.nav.push(TimetabledCategoryPage, { category: category.key });
      return;
    }

    this.nav.push(HelpCategoryPage, { category: category.key });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({ content: "Please wait..." });
    this.loader.present();
  }
}
