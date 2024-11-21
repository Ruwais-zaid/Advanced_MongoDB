import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    accountId: number;
    currency: string;
    status: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
}

const options = { discriminatorKey: '__type', collection: 'transactions' };

export const TransactionSchema: Schema<ITransaction> = new Schema<ITransaction>(
    {
        accountId: {
            type: Number,
            required: true,
            unique: true,
            minlength: [12, 'Account Id must be at least 12 characters long'],
        },
        currency: {
            type: String,
            required: true,
            default: "INR",
            enum: ["INR", "USD", "EUR"],
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        description: {
            type: String,
        },
    },
    {
        ...options, 
        timestamps: true,
    },
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
