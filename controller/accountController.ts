import Account from "../models/schema/account";
import { Request,Response } from "express";

class AccountController{
    static async create(req:Request, res:Response){
        try{
         const {accountNumber,accountHolderName,IFSCCode,amount,type} = req.body
         const user =new Account({
             accountNumber:accountNumber,
             accountHolderName:accountHolderName,
             IFSCCode:IFSCCode,
             amount:amount,
             type:type
         })
         await user.save()
         res.status(201).json({message:'Account created successfully', user})
 
        }catch(err:any){
            res.status(500).json({message:err.message})
 
        }
    }
    static async SBI(req:Request, res:Response){
        try{
         const db =  await Account.find().sort({accountNumber:1})
         if(!db){
            res.status(404).json({message:'Account not found'})
         }
         res.status(200).json({message:'SBI Account retrieved successfully', db})
 
        }catch(err:any){
            res.status(500).json({message:err.message})
 
        }
    }
}

export default AccountController;