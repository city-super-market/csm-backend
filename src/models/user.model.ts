import { Schema, model, Error as mongooseError } from 'mongoose';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { IUserMethods, IUserSchema, TUserModel } from '../interfaces/models/user';

const userSchema = new Schema<IUserSchema, TUserModel, IUserMethods>(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required'],
            maxlength: [32, 'Name cannot be more than 32 characters'],
            minlength: [3, 'Name must be at least 3 characters long'],
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: [true, 'Email is required'],
            maxlength: [255, 'Email cannot be more than 255 characters'],
            minlength: [7, 'Email must be at least 7 characters long'],
        },
        phone_number: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Phone number is required'],
            maxlength: [10, 'Phone number cannot be more than 10 characters'],
            minlength: [10, 'Phone number must be at least 10 characters long'],
        },
        hashed_password: {
            type: String,
            required: [true, 'Password is required'],
        },
        role: {
            type: String,
            enum: {
                values: ['ADMIN', 'SUPER_ADMIN', 'USER'], // TODO: move roles to constants
                message: '{VALUE} is not identified',
            },
            default: 'USER',
        },
        allow_password_change: {
            type: Boolean,
            default: false,
        },
        salt: {
            type: String,
            default: uuidv4(),
        },
    },
    { timestamps: true },
);

// TODO: convert the below virtual to pre-save method
userSchema.virtual('password').set(function (plainPassword: string): void {
    this.hashed_password = this.hashPassword(plainPassword);
});

// Methods  (DO NOT USE ARROW FUNCTIONS TO CREATE MONGOOSE METHODS)
userSchema.methods.hashPassword = function (plainPassword: string): string {
    if (!plainPassword) return '';
    try {
        return crypto.createHmac('sha256', this.salt).update(plainPassword).digest('hex');
    } catch (err) {
        throw new mongooseError(`[UserModel][hashPassword]: ${err}`);
    }
};

userSchema.methods.authenticate = function (plainPassword: string): boolean {
    const hashedPassword = this.hashPassword(plainPassword);
    if (hashedPassword) return crypto.timingSafeEqual(Buffer.from(hashedPassword), Buffer.from(this.hashed_password));
    return false;
};

// Statics
userSchema.statics.findUserByEmail = async function (email) {
    return await this.findOne({ email });
};

userSchema.statics.addUser = async function (data) {
    return await this.create(data);
};

userSchema.statics.updateUser = async function (identifier, data) {
    return await this.updateOne(identifier, data);
};

const User = model<IUserSchema, TUserModel>('User', userSchema);

export default User;
