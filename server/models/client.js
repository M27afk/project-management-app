import { Schema,model } from "mongoose";

const clientSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true
    },
})

export default model("client",clientSchema)