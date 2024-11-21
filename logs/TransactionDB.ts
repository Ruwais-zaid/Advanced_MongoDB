import mongoose from "mongoose";   
import Upi from "../models/schema/upi"; 

export const performTransaction = async () => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const upiNumber = 7008396989; 
    const amount = 100;


    const upiAccount = await Upi.findOne({ upiNumber }).session(session);
    if (!upiAccount) {
      throw new Error("UPI account not found");
    }

    if (upiAccount.amount < amount) {
      throw new Error("Insufficient balance");
    }
    await Upi.updateOne(
      { upiNumber },
      {
        $inc: { amount: -amount },
      },
      { session }
    );
    await Upi.create(
      [
        {
          upiNumber,
          amount,
          transactionType: "debit",
        },
      ],
      { session }
    );
    await session.commitTransaction();
    console.log("Transaction completed successfully");
  } catch (err: any) {
    await session.abortTransaction();
    console.error("Transaction aborted:", err.message);
  } finally {
    session.endSession();
  }
};
