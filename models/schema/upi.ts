import mongoose,{Schema,Document} from 'mongoose'

export interface UPI extends Document{
    upiNumber:number;
    amount: number;
    type: string;   
}


const UPISchema:Schema<UPI> = new Schema<UPI>({

    upiNumber:{
        type: Number,
        required: true,
        maxlength:[10,"UPI number must be less than 10"],
    },
    amount:{
        type: Number,
        required: true,

    },
    type:{
        type:String,
        enum:["credit","debit"],
        default:null,

    }
},{
    writeConcern:{
        w:"majority",
        j:true,
    }
})

export default mongoose.model("UPISchema",UPISchema);