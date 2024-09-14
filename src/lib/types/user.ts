export interface User {
    id: string;
    googleId: string;
    firstName: string;
    lastName: string;
    email?: string;
    password?: string;
    status: string;
    loggedIn?: boolean;
    username?: string;
    conversations?: object[];
    messages?: object[];
    messageReceipts?: [];
    createdAt?: Date;
    updateAt?: Date;
    deletedAt?: Date;
}