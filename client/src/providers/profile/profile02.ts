import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

import { UserProfileModel } from '../../models/userProfile';
import { UserProfileService } from '../../models/userProfile-service';

@Injectable()
export class Profile02Provider {

  userProfile: UserProfileModel;
  userService: UserProfileService;
  currentUser: firebase.User;

  constructor(private storage: Storage) {
    this.userService = new UserProfileService();
    firebase.auth().onAuthStateChanged((user: firebase.User) =>{
      if (user) {
        this.currentUser = user;
        this.initUser(user.uid);        
      }
    });
  }

  initUser(id){
    this.userService.getProfile(id).on('value', snap => {
      this.userProfile = new UserProfileModel()
       if (snap.val()) {
         this.userProfile.setModel(snap.val().firstName
         , snap.val().lastName
         , snap.val().phone
         , id);
       }
     })
  }

  // AddDetails(driver:UserProfileModel){
  //   return this.userService.addProfile(driver)
  // }

  getUser() {
    return this.currentUser || null;
  }
  getProfile() {
    return this.userProfile || null;
  }

  authenticated(key) {
    //.then((value) => {})
    // var profile = this.storage.get(UserType.Driver.toString()) || this.storage.get(UserType.Client.toString())
    // if (profile) {
    //   profile.then((value) => {
    //     // var json = '{"result":true, "count":42}';
    //     var obj = JSON.parse(value);
    //     this.initUser(value);
    //   });
    // }

    // this.storage.get(key).then((value) => {  this.initUser(value);   });
  }

  keepAuthe(key, valaue) {
    this.storage.set(key, valaue);
  }

  detachAuthe(key) {
    this.storage.remove(key);
  }
  clear() {
    this.storage.clear().then(() => { console.log('all keys cleared'); });
  }

  updateDisplayProfile(id: any, value: string) {
    return firebase.database().ref(`userModel/${id}`).update({
      displayName: value
    });
  }

  RateDriver(id: any, value: boolean): Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_HasRated: value
    });
  }

  ApprovePickup(value: boolean, id: any): Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_PickedUp: value,
    });
  }

  ApproveDrop(value: boolean, id: any): Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_Dropped: value,
    });
  }

  SendMessage(value: string, id: any): Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_Message: value,
    });
  }

  CanCharge(value: boolean, id: any): Promise<any> {
    return firebase.database().ref(`Customer/${id}/client`).update({
      Client_CanChargeCard: value,
    });
  }


  
}