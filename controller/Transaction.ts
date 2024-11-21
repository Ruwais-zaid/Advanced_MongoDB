import transaction from '../models/schema/transaction';
import Transaction from '../models/schema/transaction'
import { Request,Response } from 'express'

//CRUD OPEARATIONS

class TransactionController{
    static async create(req:Request,res:Response){

        try{

            const body = req.body;
            //Create Collections transaction
            const transaction = new Transaction({
                accountId:body.accountId,
                currency:body.currency,
                status:body.status,
                description:body.description,


            })
            await transaction.save();

            res.status(201).json({
                message:"Transaction created successfully",
                transaction:transaction
            })
            
        }catch(err:any){
            res.status(500).json({message: "Internal Server Error" + err});
        }
    }
    static async read(req:Request,res:Response){
        try{

            const transaction = await Transaction.find();
            if(!transaction){
                res.status(404).json({message:"No transaction found"})
            }
            res.status(200).json({
                status:'200',
                transaction
            })
        }catch(err:any){
            res.status(500).json({message: "Internal Server Error" + err});
        }
    }
    static async update(req:Request,res:Response){
        try{
            const {id} =  req.params;
            const body = req.body;
            const transaction = await Transaction.findByIdAndUpdate(id,body,{new:true});
            if(!transaction){
                res.status(404).json({message:"No transaction found"})
            }
            res.status(200).json({
                status:'200',
                transaction
            })
        }catch(err:any){
            res.status(500).json({message:"Internal Server Error" + err})
        }
    }
    static async delete(req:Request,res:Response){
        try{
            const {id} = req.params;
            const transaction = await Transaction.findByIdAndDelete(id);
            if(!transaction){
                res.status(404).json({message:"No transaction found"})
            }
            res.status(200).json({
                status:'200',
                message:"Transaction deleted successfully"
                
            })
        }catch(err:any){
            res.status(500).json({message:"Internal Server Error" + err})

        }
    }
    static async completed(req: Request, res: Response){
        try{
            const {id} = req.params;
            if(!id){
                res.status(404).json({message:"No transaction found"})
            }
            const transaction= await Transaction.findByIdAndUpdate(id,{status:"accepted"},{new:true})
            if(!transaction){
                res.status(404).json({message:"No transaction found"})
            }
            res.status(200).json({
                status:'200',
                message:"Transactions status Accpeted",
                transaction
            })

        }
        catch(err:any){
            res.status(500).json({message:"Internal Server Error" + err})
        }
    }
}
export default TransactionController;