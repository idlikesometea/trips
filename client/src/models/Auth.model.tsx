export interface User {
    id: number;
    givenName: string;
    familyName: string;
    email: string;
    imageUrl: string;
}

export interface Auth {
    userLogged: boolean;
    user: User;
}