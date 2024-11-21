import Post from '../models/schema/Post'
import { Request,Response } from 'express'
import user from '../models/schema/user'

class PostController{
    static async create(req:Request, res:Response){
       try{
        const {title,content,id} = req.body
        const post =new Post({
            title:title,
            content:content,
            userId:id
        })
            
        await post.save()
        res.status(201).json({message:'Post created successfully', post})

       }catch(err:any){
           res.status(500).json({message:err.message})

       }

    }
    static async getPostwithUser(req:Request,res:Response){
        try{
            const post = await Post.find().populate('userId','name email')
            if(!post){
                res.status(404).json({message:'No post found'})
            }
            res.status(200).json({message:'Post Found SucessFully',post})
        }catch(err:any){
            res.status(500).json({message:err.message})
        }
    }
}

export default PostController;