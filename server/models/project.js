import mongoose, { Schema,model } from "mongoose";

const projectSchema=new Schema({
    clientId:{
        type:Schema.Types.ObjectId,
        ref:'client'
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['In Progress','Completed','Analysis'],
        required:true,
    },
   
})

export default model("project",projectSchema)