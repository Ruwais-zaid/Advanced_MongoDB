import mongoose, { Schema } from 'mongoose';
import { ITransaction, TransactionSchema } from './transaction';

export interface IAccountTransfer extends ITransaction {
    accountNumber: number;
    accountHolderName: string;
    IFSCCode: string;
    amount: number;
    type: string; 
}

const AccountTransferSchema: Schema<IAccountTransfer> = new Schema<IAccountTransfer>({
    accountNumber: {
        type: Number,
        required: true,
    },
    accountHolderName: {
        type: String,
        required: true,
    },
    IFSCCode: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true,
    },
});

export default mongoose.model('AccountTransfer',AccountTransferSchema)
