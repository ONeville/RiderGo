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

 interface pickModel {
    id: string,
    email: string,
    location: string
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isAvailable: boolean = false;
  
  userProfile: UserProfileModel;
  service: UserProfileService;
  poolService: DriverPoolService;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams
    , private geoFire: GeofireProvider
    , private profileProvider: Profile02Provider) {
    this.poolService = new DriverPoolService();
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
    console.log("Toggled: " + this.isAvailable); 
    if (this.isAvailable) {
      this.testGeoFire();      
    } else {
      this.poolService.removeDriverFromPool(this.userProfile.Id);
    }
  }

  testGeoFire() {
    
    var rider = new DriverPoolModel();
    rider.setModel(this.userProfile.Id, 1, 0.56)
    this.poolService.addDriverInPool(rider).on("child_added", function (snapshot, prevChildKey) {
      if (snapshot) {
        if (snapshot.key == 'driverId') {
          var newPost = snapshot.val();      
          this.geoFire.setInPool(newPost, [32.777671, -96.803704]);          
        }
      }
    });
    
    
    // this.geoFire.setInPool({ id: this.userProfile.Id, name: "driver - 2", status: 1, quote: 0.56, date: new Date() }, [32.778970, -96.796494]);
    // this.geoFire.setInPool({ id: this.userProfile.Id, name: "driver - 3", status: 1, quote: 0.56, date: new Date() }, [32.777036, -96.792160]);
    // this.geoFire.setInPool({ id: this.userProfile.Id, name: "driver - 4", status: 1, quote: 0.56, date: new Date() }, [32.786417, -96.792675]);
  }

  inquireLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{



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
