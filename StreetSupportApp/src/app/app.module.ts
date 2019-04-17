import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';

import { LocationProvider } from '../providers/location-provider';
import { ApiProvider } from '../providers/api-provider';
import { ContentProvider } from '../providers/content-provider';
import { NeedsProvider } from '../providers/resources/needs-provider';
import { AuthProvider } from '../providers/auth0-provider';

import { AccomodationPage } from '../pages/accomodation/accomodation';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { ContentPage } from '../pages/default-content/default-content';
import { NeedsPage } from '../pages/needs/needs';
import { NeedResponsePage } from '../pages/need-responses/need-responses';
import { EmergencyPage } from '../pages/emergency/emergency';
import { EmergencyDetailPage } from '../pages/emergency-detail/emergency-detail';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FindHelpPage } from '../pages/find-help/find-help';
import { HelpCategoryPage } from '../pages/help-category/help-category';
import { HelpCategoryDetailPage } from '../pages/help-category-detail/help-category-detail';
import { OrganisationPage } from '../pages/organisation/organisation';
import { OrganisationListPage } from '../pages/organisation-list/organisation-list';
import { OrganisationServicePage } from '../pages/organisation-service/organisation-service';
import { TimetabledCategoryPage } from '../pages/timetabled-category/timetabled-category';
import { TimetabledCategoryDetailPage } from '../pages/timetabled-category-detail/timetabled-category-detail';

import { HeaderComponent } from '../components/header/header';

import { SortByOrder } from '../pipes/sort-by-order';
import { SortByAlpha } from '../pipes/sort-by-alpha';
import { SortByDay } from '../pipes/sort-by-day';
import { SortByOpeningTime } from '../pipes/sort-by-opening-time';
import { SortBySortPosition } from '../pipes/sort-by-sort-position';
import { FilterByClientGroup } from '../pipes/filter-by-client-group';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    SettingsPage,
    AccomodationPage,
    HomePage,
    TabsPage,
    ContentPage,
    EmergencyPage,
    NeedsPage,
    NeedResponsePage,
    EmergencyDetailPage,
    FindHelpPage,
    HelpCategoryPage,
    HelpCategoryDetailPage,
    OrganisationPage,
    OrganisationListPage,
    OrganisationServicePage,
    TimetabledCategoryPage,
    TimetabledCategoryDetailPage,
    HeaderComponent,
    SortByOrder,
    SortByAlpha,
    SortByDay,
    SortByOpeningTime,
    SortBySortPosition,
    FilterByClientGroup
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
    SettingsPage,
    AccomodationPage,
    HomePage,
    TabsPage,
    ContentPage,
    EmergencyPage,
    NeedsPage,
    NeedResponsePage,
    EmergencyDetailPage,
    FindHelpPage,
    HelpCategoryPage,
    HelpCategoryDetailPage,
    OrganisationPage,
    OrganisationListPage,
    OrganisationServicePage,
    TimetabledCategoryPage,
    TimetabledCategoryDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    ContentProvider,
    NeedsProvider,
    LocationProvider,
    AuthProvider
  ]
})
export class AppModule { }
