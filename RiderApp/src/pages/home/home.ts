import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';


import { UserProfileModel } from '../../models/userProfile';
import { UserProfileService } from '../../models/userProfile-service'
import { Profile02Provider } from '../../providers/profile/profile02';

import { GeofireProvider } from '../../providers/geofire/geofire';
import { DriverPoolModel, DriverPoolService } from '../../models/driverPool';


// import { DriverPoolModel, DriverPoolService } from '../../models/driver/driverPool';
/**
 * Generated class for the DriverIndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isAvailable: boolean = false;
  
  userProfile: UserProfileModel;
  service: UserProfileService;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams
    , private geoFire: GeofireProvider
    , private profileProvider: Profile02Provider) {
  }
  
  ionViewDidLoad(){
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.navCtrl.setRoot('LoginPage');
        unsubscribe();
      }else{
        unsubscribe(); 
        this.service = new UserProfileService();

        this.service.getProfile(user.uid).orderByKey().on('value', snap => {
          this.userProfile = new UserProfileModel();
          if (snap.exists()) {
            this.userProfile.setModel(snap.val().firstName, snap.val().lastName, snap.val().phone, user.uid)
          } else {
            // this.navCtrl.setRoot('LoginPage');
            this.navCtrl.push('UserIdentityPage', { paramId: user.uid });
          }
      });
    }
    });
    
  }


  notify() {
    console.log("Toggled: "+ this.isAvailable); 
  }

  inquireLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{

        var driver = new DriverPoolModel();
        driver.setModel(this.userProfile.Id, "On", 0.56, [crd.latitude, crd.longitude], new Date())


        var crd = position.coords;
        var latLng = {
          lat:crd.latitude,
          lng: crd.longitude
        }
        
        // this.geoFire.setLocation(locationLb, [crd.latitude, crd.longitude])


        // this.navCtrl.push('LookupPage', { locations: data });

      }, ()=>{ console.warn(`ERROR: geolocation`);});

     }

  }
}
