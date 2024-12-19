export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

export interface Diamond {
    id: number;
    name: string;
    type: string;
    weight: number;
    price: number;
    listedById: number;
    listedBy: User;
    createdAt: string;
}

export interface Transaction {
    id: number;
    buyerId: number;
    buyer: User;
    diamondId: number;
    diamond: Diamond;
    price: number;
    transactionAt: string;
}