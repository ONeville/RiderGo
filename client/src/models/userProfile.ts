export class UserProfileModel {
    public Id: string
    public FirstName: string
    public LastName: string
    public Phone: number
    constructor() {
 
    }

    setModel(firstName, lastName, phone, userId = '0'){
        this.Id = userId;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Phone = phone;
    }
 
    getModel(){
        return {
            id: this.Id,
            firstName: this.FirstName,
            lastName: this.LastName,
            phone: this.Phone
        }
    }
}