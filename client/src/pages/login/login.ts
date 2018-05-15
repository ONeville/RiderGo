import { Component } from '@angular/core';
import {
  Loading,
  Platform,
  LoadingController, 
  NavController,
  AlertController, MenuController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { IonicPage } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

import { Auth02Provider } from '../../providers/auth/auth02';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loading: Loading;
  initState: boolean =  false;

  constructor(private navCtrl: NavController, 
    private platform: Platform, 
    private diagnostic: Diagnostic, 
    private menu: MenuController, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController, 
    private formBuilder: FormBuilder, 
    private auth02Provider: Auth02Provider,) {
      menu.swipeEnable(false, 'menu1');
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

  }

  ionViewDidLoad(){
 }

  enableLogin(){
    this.initState = true;
  }

  login(){
    if (this.loginForm.valid){     
      this.auth02Provider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.initState = false;          
          this.navCtrl.setRoot('HomePage');
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  
  goToSignup() {
    this.navCtrl.setRoot('SignupPage');
  }

  goToResetPassword() {
    this.navCtrl.push('ResetPasswordPage');
  }

  

}
