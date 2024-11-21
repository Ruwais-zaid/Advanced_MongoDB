import mongoose, { Schema, Document } from 'mongoose';

export interface Address {
    country: string;
    state: string;
    city: string;
    pincode: number;
}

export interface User extends Document {
    name: string;
    email: string;
    age: number;
    password: string;
    address: Address;
}

const AddressSchema: Schema = new Schema({
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    state: {
        type: String,
        required: [true, "State is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    pincode: {
        type: Number,
        required: [true, "Pincode is required"],
        unique: true,
        validate: {
            validator: (v: number) => v.toString().length === 6,
            message: "Pincode must be exactly 6 digits",
        },
    },
});

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please provide a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        validate: {
            validator: (value: number) => value >= 18,
            message: "Age must be greater than or equal to 18",
        },
    },
    address: {
        type: AddressSchema,
        required: [true, "Address is required"],
    },
});

export default mongoose.model<User>('User', UserSchema);
