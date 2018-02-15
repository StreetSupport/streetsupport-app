import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { MyApp } from './app.component';

import { LocationProvider } from '../providers/location-provider';
import { ApiProvider } from '../providers/api-provider';
import { ContentProvider } from '../providers/content-provider';

import { AboutPage } from '../pages/about/about';
import { ContentPage } from '../pages/default-content/default-content';
import { EmergencyPage } from '../pages/emergency/emergency';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FindHelpPage } from '../pages/find-help/find-help';
import { AccommodationPage } from '../pages/accommodation/accommodation';
import { AccommodationDetailPage } from '../pages/accommodation-detail/accommodation-detail';
import { HelpCategoryPage } from '../pages/help-category/help-category';
import { HelpCategoryDetailPage } from '../pages/help-category-detail/help-category-detail';
import { OrganisationPage } from '../pages/organisation/organisation';
import { OrganisationListPage } from '../pages/organisation-list/organisation-list';
import { OrganisationServicePage } from '../pages/organisation-service/organisation-service';
import { TimetabledCategoryPage } from '../pages/timetabled-category/timetabled-category';
import { TimetabledCategoryDetailPage } from '../pages/timetabled-category-detail/timetabled-category-detail';

import { HeaderComponent } from '../components/header/header';
import { ShowBoolComponent } from '../components/show-bool/show-bool';

import { SortByOrder } from '../pipes/sort-by-order';
import { SortByAlpha } from '../pipes/sort-by-alpha';
import { SortByDay } from '../pipes/sort-by-day';
import { SortByOpeningTime } from '../pipes/sort-by-opening-time';

// Ionic Native Providers
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ContentPage,
    EmergencyPage,
    FindHelpPage,
    AccommodationPage,
    AccommodationDetailPage,
    HelpCategoryPage,
    HelpCategoryDetailPage,
    OrganisationPage,
    OrganisationListPage,
    OrganisationServicePage,
    TimetabledCategoryPage,
    TimetabledCategoryDetailPage,
    HeaderComponent,
    ShowBoolComponent,
    SortByOrder,
    SortByAlpha,
    SortByDay,
    SortByOpeningTime
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    ContentPage,
    EmergencyPage,
    FindHelpPage,
    AccommodationPage,
    AccommodationDetailPage,
    HelpCategoryPage,
    HelpCategoryDetailPage,
    OrganisationPage,
    OrganisationListPage,
    OrganisationServicePage,
    TimetabledCategoryPage,
    TimetabledCategoryDetailPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    ContentProvider,
    LocationProvider,

    // Ionic Native Providers
    Geolocation,
    GoogleAnalytics,
    InAppBrowser,
    SplashScreen,
    StatusBar,
  ]
})
export class AppModule {}
