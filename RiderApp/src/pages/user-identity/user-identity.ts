import { Component, OnInit } from '@angular/core';
import { 
  NavController, 
  NavParams,
  Loading,
  LoadingController,
  AlertController, MenuController  } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { AuthProvider } from '../../providers/auth/auth';
import { IonicPage } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


import { Profile02Provider } from '../../providers/profile/profile02';

// import { UserLoginModel } from '../../models/userLoging';
import { UserProfileModel } from '../../models/userProfile';
import { UserProfileService } from '../../models/userProfile-service';

/**
 * Generated class for the UserIdentityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-identity',
  templateUrl: 'user-identity.html',
})
export class UserIdentityPage implements OnInit {
  public profileForm: FormGroup;
  loading: Loading;
  onEdit: boolean = false;

  
  userProfile: UserProfileModel;
  userService: UserProfileService;
  currentUser: any;
  userId:any

  constructor(public navCtrl: NavController, public stB: StatusBar, public menu: MenuController,  
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, private profile: Profile02Provider,
    private navParams: NavParams) {
      menu.swipeEnable(false, 'menu1');
      this.onEdit = navParams.get('paramEdit') === "edit" ? true : false;
      this.userId = navParams.get('paramId') || 0;
      this.currentUser = this.profile.getUser();
      this.userProfile = this.profile.getProfile();
      this.userService = new UserProfileService();
  }

  ngOnInit(): void {
    //this.onEdit = this.navParams.get('paramData') === "edit" ? true : false;
    this.initForm();
  }

  initForm() {
    if (!this.onEdit) {
      this.profileForm = this.formBuilder.group({
        firstName:  new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(11), Validators.maxLength(11)
        ]))
        
        // firstName: ['',Validators.compose([Validators.required])],
        // lastName: ['',Validators.compose([Validators.required])],
        // phone: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
      });
    }

    this.loadForm()
  }

  loadForm() {
    if (this.onEdit && this.userProfile) {
      this.profileForm = this.formBuilder.group({
        firstName: [this.userProfile.FirstName, Validators.compose([Validators.minLength(2), Validators.maxLength(200), Validators.required])],
        lastName: [this.userProfile.LastName, Validators.compose([Validators.minLength(2), Validators.maxLength(200), Validators.required])],
        phone: [this.userProfile.Phone, Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required])],
      });
    }
  }

  save(){
    if (this.profileForm.valid){
      let loading = this.loadingCtrl.create({
        content: 'Finalizing..'
      });
    
      loading.present();

      if (this.onEdit) {
        this.updateProfile(loading);
      } else {
        this.addProfile(loading);
      }
    }
  }


  addProfile(loading) {
    if (this.userId.length > 1) {
      var itemModel = new UserProfileModel()
      itemModel.setModel(this.profileForm.value.firstName
      , this.profileForm.value.lastName
      , this.profileForm.value.phone
      , this.userId);

      this.userService.addProfile(itemModel).then(success =>{
        loading.dismiss().then(suc =>{
          this.userService.update(this.userId, this.profileForm.value.firstName)
          this.stB.show();
          this.navCtrl.setRoot('LoginPage')
        })
      });

    }
  }

  updateProfile(loading) {
    if (this.userId.length > 1) {

      var driverModel = new UserProfileModel()
      driverModel.setModel(this.profileForm.value.firstName
      , this.profileForm.value.lastName
      , this.profileForm.value.phone
      , this.userId);
        this.userService.updateProfile(driverModel).then(success =>{
            loading.dismiss().then(suc =>{ 
              this.userService.update(this.userId, this.profileForm.value.firstName)
              this.stB.show();
            })
        });  
    }
    
  }

}
