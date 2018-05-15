import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isAvailable: boolean = false;
  
  userProfile: UserProfileModel;
  service: UserProfileService;
  currentLocationControl: any = {
    id: 1,
    label: 'Your location',
    icon: 'md-locate'
  }
  destinationLocationControl: any = {
    id: 2,
    label: 'Choose Destination',
    icon: 'md-pin'
  }
  onRequest: boolean = false

  locationLatLng: any;
  destinationLatLng: any;
  geocoder: any = new google.maps.Geocoder;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams
    , private geoFire: GeofireProvider
    , private profileProvider: Profile02Provider
    , private modalCtrl: ModalController) {
  }
  
  ionViewDidLoad(){
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.navCtrl.setRoot('LoginPage');
        unsubscribe();
      }else{
        unsubscribe(); 
        this.service = new UserProfileService();

        this.service.getProfile(user.uid).on('value', snap => {
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

  showAddressModal (selectedBar) {
    let modal = this.modalCtrl.create('AutocompletePage', { labelIndex: selectedBar });
    modal.onDidDismiss(data => {
      //this.address.place = data;
    if (selectedBar == 1 && data != null){
      this.currentLocationControl = {
        id: 1,
        label: data,
        icon: 'md-locate'
      }
      this.geocoder.geocode( { 'address': data}, (results, status) => {
        if (status == 'OK') {
          this.locationLatLng = results[0].geometry.location;
        } else { alert('Geocode was not successful for the following reason: ' + status); }
      });
    }
    if (selectedBar == 2 && data != null){
      this.destinationLocationControl = {
        id: 2,
        label: data,
        icon: 'md-pin'
      }
      this.onRequest = true;
      this.geocoder.geocode( { 'address': data}, (results, status) => {
        if (status == 'OK') {
          this.destinationLatLng = results[0].geometry.location;
          this.onRequest = true;
        } else {
         alert('Geocode was not successful for the following reason: ' + status);
        }
      });
      
    }
    });
    modal.present();
  }


  findDrivers(){
    let startLatLng = this.locationLatLng
    let destLatLng = this.destinationLatLng

     if (startLatLng === undefined){
         if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{

            var crd = position.coords;
            startLatLng = {
              lat:crd.latitude,
              lng: crd.longitude
            }
            
            //this.geoFire.setLocation(locationLb, [crd.latitude, crd.longitude])
  
            let data = {
              current : startLatLng,
              destination: destLatLng
            }
  
            this.navCtrl.push('LookupPage', { locations: data });
  
          }, ()=>{ console.warn(`ERROR: geolocation`);});

         }

      }else{
        let data = {
          current : startLatLng,
          destination: destLatLng
        }
        //this.geoFire.setLocation(locationLb, [startLatLng.lat(), startLatLng.lng()])
        //console.log('XY: ' + JSON.stringify(data));
        this.navCtrl.push('LookupPage', { locations: data });
      }
  }
}
