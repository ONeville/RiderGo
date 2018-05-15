import firebase from 'firebase';
import { UserProfileModel } from './userProfile';

export class UserProfileService {
    public profileDb: firebase.database.Reference;
    constructor() {
        // this.profileDb = firebase.database().ref();
        this.profileDb = firebase.database().ref('client/userProfile');
    }

     
    addProfile(profile: UserProfileModel) {
        var profileRef = this.profileDb.child(profile.Id);
        return profileRef.set(profile.getModel());
    }

    getProfile(id) {
        return this.profileDb.child(id).orderByKey();
    }

    updateProfile(profile: UserProfileModel) {
        var profileRef = this.profileDb.child(profile.Id);
        return profileRef.update({
            firstName: profile.FirstName,
            lastName: profile.LastName,
            phone: profile.Phone
        });
    }
    

    update(id, name) {
        var profileRef = this.profileDb.child(id);
        return profileRef.update({
            displayName: name
        });
    }
}