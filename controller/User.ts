import User from '../models/schema/user'
import { Request,Response } from 'express'

class UserController{
    static async create(req:Request, res:Response){
       try{
        const {name, email, password,age,address} = req.body
        const user =new User({
            name:name,
            email:email,
            password:password,
            age:age,
            address:address
        })
        await user.save()
        res.status(201).json({message:'User created successfully', user})

       }catch(err:any){
           res.status(500).json({message:err.message})

       }

    }
    //Use Project to get Data 1 for include and 0 for exlude
    //contain two feild 1 include and other exclude except _id
    static async getData(req:Request,res:Response){
        try{

            const db  = await User.find().select('name email password');
            if(!db){
                res.status(404).json({message:'No data found'})
            }
            res.status(200).json({message:'Data found',db})
        }catch(err:any){
            res.status(500).json({meassage:err.message})

        }

    }
    static async getEmail(req:Request,res:Response){
        try{
            const db = await User.find({},{email:1,_id:0})
            if(!db){
                res.status(404).json({message:'No data found'})
            }
            res.status(200).json({message:'Email Found SucessFully',db})
        }catch(err:any){
            res.status(500).json({message:err.message})
        }
    }

    static async updatePassword(req: Request, res: Response){
        try {
            const {id} = req.params;
            const {password} = req.body;    
            
            if(!id || !password){
                res.status(400).json({message: 'Please provide id and password'})
            }

            const updatedPassword = await User.findByIdAndUpdate(id,{password:password},{new:true});
            if(!updatedPassword){
                res.status(404).json({message:'User not found'})
            }
            res.status(200).json({message:'Password updated successfully',updatedPassword})
        
        
        }catch(err:any){
            res.status(500).json({message:err.message})
        }
    }
}
export default UserController;