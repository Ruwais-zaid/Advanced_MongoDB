import mongoose, {Schema,Document} from 'mongoose'

export interface IPost extends Document{
    title:string,
    content:string,
    userId:mongoose.Types.ObjectId //ref to User object
}

const IPostSchema : Schema = new Schema({
    title: {type:String,required:true},
    content: {type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
})



export default mongoose.model('IPost',IPostSchema)