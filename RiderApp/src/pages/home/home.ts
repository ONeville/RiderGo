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

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public profileProvider: Profile02Provider
    , public poolProvider: GeofireProvider) {

    this.poolService = new DriverPoolService();
    // this.geoFirePr.setInPool("newPost1000", [32.777671, -96.803704]);  
    this.poolProvider.getDriversOnService(0.78, [32.775625, -96.801848]);
    
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

    console.log(this.poolProvider.hits.value);
    

    if (this.isAvailable) {
      //this.testGeoFire();      
    } else {
      // this.poolService.removeDriverFromPool(this.userProfile.Id);
      // this.poolService.removeDriverFromPool("driver - 1");
      // this.poolService.removeDriverFromPool("driver - 2");
      // this.poolService.removeDriverFromPool("driver - 3");
      // this.poolService.removeDriverFromPool("driver - 4");
    }
  }

  
  testGeoFire() {
    // this.poolProvider.setInPool(this.userProfile.Id, [32.777671, -96.803704]);
    this.poolProvider.setInPool("driver - 1", [32.777671, -96.803704]);
    this.poolProvider.setInPool("driver - 2", [32.778970, -96.796494]);
    this.poolProvider.setInPool("driver - 3", [32.777036, -96.792160]);
    this.poolProvider.setInPool("driver - 4", [32.786417, -96.792675]);


    // var rider = new DriverPoolModel();
    // rider.setModel(this.userProfile.Id, 1, 0.56)
    // this.poolService.addDriverInPool(rider);
    
    var rider1 = new DriverPoolModel();
    var rider2 = new DriverPoolModel();
    var rider3 = new DriverPoolModel();
    var rider4 = new DriverPoolModel();
    rider1.setModel("driver - 1", 1, 0.56)
    rider2.setModel("driver - 2", 1, 0.58)
    rider3.setModel("driver - 3", 1, 0.62)
    rider4.setModel("driver - 4", 1, 0.50)
    this.poolService.addDriverInPool(rider1);
    this.poolService.addDriverInPool(rider2);
    this.poolService.addDriverInPool(rider3);
    this.poolService.addDriverInPool(rider4);
    
    // on("child_added", function (snapshot, prevChildKey) {
    //   if (snapshot) {
    //     if (snapshot.key == 'driverId') {
    //       var newPost = snapshot.val();      
    //       // this.geoFirePr.setInPool(newPost, [32.777671, -96.803704]); 
                   
    //     }
    //   }
    // });
    
    
    // this.geoFire.setInPool({ id: this.userProfile.Id, name: "driver - 2", status: 1, quote: 0.56, date: new Date() }, [32.778970, -96.796494]);
    // this.geoFire.setInPool({ id: this.userProfile.Id, name: "driver - 3", status: 1, quote: 0.56, date: new Date() }, [32.777036, -96.792160]);
    // this.geoFire.setInPool({ id: this.userProfile.Id, name: "driver - 4", status: 1, quote: 0.56, date: new Date() }, [32.786417, -96.792675]);
  }

  inquireLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        var crd = position.coords;        
        // this.geoFire.setLocation(locationLb, [crd.latitude, crd.longitude])
        this.poolProvider.setInPool(this.userProfile.Id, [crd.latitude, crd.longitude]); 
        var rider = new DriverPoolModel();
        rider.setModel(this.userProfile.Id, 1, 0.56)
        this.poolService.addDriverInPool(rider);

      }, ()=>{ console.warn(`ERROR: geolocation`);});

     }

  }
}
