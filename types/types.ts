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

export interface CardProps {
    name: string;
    price: string;
    description: string;
    onClick?: () => void;
}

export interface Wishlist {
    id: number;
    userId: number;
    diamondId: number;
    diamond: Diamond;
    createdAt: string;
}

export interface Balance {
    id: number;
    userId: number;
    balance: number;
    createdAt: string;
}