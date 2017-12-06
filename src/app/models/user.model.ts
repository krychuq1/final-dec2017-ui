export class UserModel{
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;

    constructor(firstName: string,  lastName: string, email: string, isAdmin: boolean) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}