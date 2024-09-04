import { Model } from 'mongoose';

export interface IUserSchema {
    name: string;
    email: string;
    phone_number: string;
    hashed_password: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
    allow_password_change: boolean;
    password?: string;
    salt: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMethods {
    hashPassword(password: string): string;
    authenticate(plainPassword: string): boolean;
}

export type TUserModel = Model<IUserSchema, {}, IUserMethods>;
