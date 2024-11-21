import Upi from "../models/schema/upi";
import { Request,Response } from "express";

class UpiController{
    static async create(req:Request, res:Response){
        try{
         const {upiNumber, amount,type} = req.body
         const user =new Upi({
             upiNumber:upiNumber,
             amount:amount,
             type:type
         })
         await user.save()
         res.status(201).json({message:'User created successfully', user})
 
        }catch(err:any){
            res.status(500).json({message:err.message})
 
        }
 
     }
     static async paymentCondition(req:Request, res:Response){
        try{

            const db = await Upi.find({
                $and:[{
                    amount:{
                        $lt:3000
                    },
                },{
                    type:{
                        $eq:'Debit'
                    }
                }]
            })

        if(!db){
            res.status(404).json({message:'No data found'})
        }
        res.status(200).json({
            message:"Limit reached Plz make upto 3000 cash",
        })
        }catch(arr:any){
            res.status(500).json({message:arr.message});
        }
     }
     static async statusCheck(req:Request, res:Response){
        try{

            const db = await Upi.find({
                $or:[{
                    amount:{
                        $gt:3000
                    },
                },{
                    type:{
                        $eq:'credit'
                    }
                }]
            })

        if(!db){
            res.status(404).json({message:'No data found'})
        }
        res.status(200).json({
            message:"Status get a reward ",
            data:db
        })
        }catch(arr:any){
            res.status(500).json({message:arr.message});
        }
     }
}
export default UpiController;