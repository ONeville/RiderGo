import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
//import { BrowserTab} from '@ionic-native/browser-tab';
// import {
//   GoogleMaps,
//   GoogleMap,
//   //GoogleMapsEvent,
//   //GoogleMapOptions,
//   //CameraPosition,
//   //MarkerOptions,
//   //Marker
//  } from '@ionic-native/google-maps';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase/app'
import { OneSignal} from '@ionic-native/onesignal';
import { Diagnostic } from '@ionic-native/diagnostic';

//providers
import { EventProvider } from '../providers/event/event';
import { MapContainerProvider } from '../providers/map-container/map-container';
import { NativeMapContainerProvider } from '../providers/map-native-container/map-native-container';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { DirectionProvider } from '../providers/direction/direction';
import { NotificationProvider } from '../providers/notification/notification';
import { AnimControlProvider } from '../providers/anim-control/anim-control';
import { PopUpProvider } from '../providers/popup/popup';

import { Auth02Provider } from '../providers/auth/auth02';
import { Profile02Provider } from '../providers/profile/profile02';

// export const firebaseConfig = {
//   apiKey: "AIzaSyCvWzAK0ghG6mynLWyfaznda2VvOsQvTeM",
//   authDomain: "mepabi-5e27b.firebaseapp.com",
//   databaseURL: "https://mepabi-5e27b.firebaseio.com",
//   projectId: "mepabi-5e27b",
//   storageBucket: "mepabi-5e27b.appspot.com",
//   messagingSenderId: "181625245865"
// };
export const firebaseConfig = {
  apiKey: "AIzaSyDSIev6GmlCmLbBSWhyAhN1QJC8tjqX1aM",
  authDomain: "ridergo-e1fdd.firebaseapp.com",
  databaseURL: "https://ridergo-e1fdd.firebaseio.com",
  projectId: "ridergo-e1fdd",
  storageBucket: "ridergo-e1fdd.appspot.com",
  messagingSenderId: "788024089332"
};

import { MyApp } from './app.component';
import { ModalContentPage } from '../pages/lookup/driver-detail';
import { GeofireProvider } from '../providers/geofire/geofire';

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    ModalContentPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalContentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // AuthProvider,
    AnimControlProvider,
    // ProfileProvider,
    GeocoderProvider,
    EventProvider,
    MapContainerProvider,
    NativeMapContainerProvider,
    DirectionProvider,
    NotificationProvider,
    PopUpProvider,
    Geolocation,
    OneSignal,
    Diagnostic,
    //GoogleMaps,
    GeofireProvider,
    Auth02Provider,
    Profile02Provider
  ]
})
export class AppModule {}
