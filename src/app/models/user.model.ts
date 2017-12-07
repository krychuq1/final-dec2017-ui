export class UserModel{
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    token: string;
    constructor(firstName: string,  lastName: string, email: string, isAdmin: boolean, token: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isAdmin = isAdmin;
        this.token = token;
    }
}
