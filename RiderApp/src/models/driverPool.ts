import { RiderState } from './enums'
export class DriverPoolModel {
    public DriverId: string
    public DriverStatus: number
    public Quote: number
    constructor() {
 
    }
//location, statusTime
    setModel(driver, status, quote){
        // this.Id = id;
        this.DriverId = driver;
        this.DriverStatus = status;
        this.Quote = quote;
        // this.Location = location;
        // this.StatusTime = statusTime;
    }
 
    getModel(){
        return {
            // id: this.Id,   
            driverId: this.DriverId,
            driverStatus: this.DriverStatus,
            quote: this.Quote,
            // location: this.Location,
            // statusTime: this.StatusTime
        }
    }
}

import firebase from 'firebase';
export class DriverPoolService {
    private profileDb: firebase.database.Reference;
    constructor() {
        this.profileDb = firebase.database().ref('rider/driverPools'); 
    }

    addDriverInPool(pool: DriverPoolModel) {
        var profileRef = this.profileDb.child(pool.DriverId);
         profileRef.set(pool.getModel());
        return profileRef;
    }

    updateDriverStatus(pool: DriverPoolModel) {
        // return firebase.database().ref(`driverPoolModel/${pool.DriverId}`).update({
        //     driverStatus: pool.DriverStatus,
        //     price: pool.Quote
        // });
        var profileRef = this.profileDb.child(pool.DriverId);
         profileRef.update({
                driverStatus: pool.DriverStatus,
                price: pool.Quote
            });
        return profileRef;
    }
    removeDriverFromPool(id) {
        return this.profileDb.child(id).remove();
    }
}
