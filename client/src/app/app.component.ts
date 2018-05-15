import { Component, ViewChild, NgZone, OnInit } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import * as firebase from 'firebase/app';

import { Auth02Provider } from '../providers/auth/auth02';
import { Profile02Provider } from '../providers/profile/profile02';
import { UserLoginModel } from '../models/userLoging';
import { UserType } from '../models/enums';


@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {

  public user: any;
  @ViewChild(Nav) nav: Nav;
  public fireAuth:firebase.auth.Auth;
  public rootPage: string = 'HomePage';
  phone: any;
  public pages: Array<{ title: string, component: any, icon: string }>
  currentUser: UserLoginModel;

  photoURL: string
  
  constructor(public zone: NgZone,  public loadingCtrl: LoadingController, private One: OneSignal, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private authO2: Auth02Provider) {
    this.initializeApp();    
  }

  ngOnInit(): void {
    this.pages = [
      { title: 'History', component: 'HistoryPage', icon: "clock" },
      { title: 'Payment', component: 'PaymentPage', icon: "card" },
      { title: 'Support', component: 'SupportPage', icon: "help-circle" },
      { title: 'About', component: 'AboutPage', icon: "information-circle" }
    ];
  }

  initializeApp() {
  this.platform.ready().then(() => {
    if (this.platform.is('cordova')) {
    this.One.startInit("61ee0e36-8694-4ec8-9436-29982b7f8d57", "890704209838");
    this.One.inFocusDisplaying(this.One.OSInFocusDisplayOption.Notification);
    this.One.setSubscription(true);
    this.One.endInit();  
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByHexString("#BBBBBB");
    setTimeout(() => {
      this.splashScreen.hide();
    }, 500);
    
  }
  });
}


  openPage(page) {
    this.nav.push(page.component);
  }

  gotoProfile(){
    this.nav.push('UserIdentityPage', { paramEdit: "edit", paramId: this.authO2.userLoginModel.Id });
  }

  logOut() {
    this.authO2.logoutUser().then(() => {
      this.nav.push('LoginPage');
    });
  }
}