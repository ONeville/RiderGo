import firebase from 'firebase';
import { UserProfileModel } from './userProfile';

export class UserProfileService {
    public profileDb: firebase.database.Reference;
    constructor() {
        this.profileDb = firebase.database().ref();
    }

     
    addProfile(profile: UserProfileModel) {
        var profileRef = this.profileDb.child(`rider/userProfile/${profile.Id}`);
        return profileRef.set(profile.getModel());
    }

    getProfile(id) {
        return this.profileDb.child(`rider/userProfile/${id}`);
    }

    updateProfile(profile: UserProfileModel) {
        var profileRef = this.profileDb.child(`rider/userProfile/${profile.Id}`);
        return profileRef.update({
            firstName: profile.FirstName,
            lastName: profile.LastName,
            phone: profile.Phone
        });
    }
    

    update(id, name) {
        var profileRef = this.profileDb.child(`rider/userSecmodel/${id}`);
        return profileRef.update({
            displayName: name
        });
    }
}