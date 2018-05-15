import { Injectable } from '@angular/core';
import  firebase from 'firebase';
import { Platform } from 'ionic-angular';

import { UserLoginModel, UserSecService } from '../../models/userLoging';
import { UserProfileService } from '../../models/userProfile-service'
import { UserType } from '../../models/enums';

@Injectable()
export class Auth02Provider {
  currentUser: firebase.User;
  profileService: UserProfileService;
  userService: UserSecService;
  userLoginModel: UserLoginModel;

  
  constructor(public platform: Platform) {
     this.userService = new UserSecService();
     this.profileService = new UserProfileService();
      this.initAuth();
  }

  initAuth(){
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.currentUser = user;
      if (user) {
        this.userService.get(user.uid).on('value', snap => {
           if (snap.val()) {
            this.userLoginModel = new UserLoginModel()
             this.userLoginModel.setModel(user.uid
             , snap.val().email
             , snap.val().type
             , snap.val().displayName);
           }
         })
        
      }
     });
  }

  AddLogin(email, password) {
    var user = new UserLoginModel()
    var userType = UserType.Driver;
    return  firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      user.setModel(newUser.uid, email, userType);
      this.userService.add(user);
      // this.userRef.child(newUser.uid).set(user.getModel());
      return newUser.uid;
    });
  }

  queryUser() {
    // var user;
    // this.userRef.ref.on('value', function (snap) {
    //   user = snap.val();
    //   console.log(user);
      
    // })
  }

  loginUser(email: string, password: string): Promise<any> {
    return  firebase.auth().signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return  firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    this.userService.get( firebase.auth().currentUser.uid).off();
    return  firebase.auth().signOut();
  }


  signOut(): void {
    firebase.auth().signOut();
  }

  displayName(): string {
    if (this.currentUser !== null) {
      return this.currentUser.displayName;
    } else {
      return '';
    }
  }

  }

  