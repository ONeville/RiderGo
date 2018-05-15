
export class UserLoginModel {
    public Id: string = '';
    public Email: string;
    public Type: number;
    public DisplayName: string = '';

    constructor(){
 
    }
    setModel(id, email, type, name = ''){
        this.Id = id;
        this.Email = email;
        this.Type = type;
        this.DisplayName = name;
    }
    getModel(){
        return {
            email: this.Email,
            type: this.Type,
            displayName: this.DisplayName
        }
    }

}

import firebase from 'firebase';
import { UserProfileModel } from './userProfile';

export class UserSecService {
    private profileDb: firebase.database.Reference;
    constructor() {
        this.profileDb = firebase.database().ref('client/userSecmodel');
    }

    add(profile: UserLoginModel) {
        var profileRef = this.profileDb.child(profile.Id);
        return profileRef.set(profile.getModel());
    }

    get(id) {
        return this.profileDb.child(id);
    }
}