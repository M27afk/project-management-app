//imports
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import { graphqlHTTP } from "express-graphql"
import schema from '../server/schema/schema.js'
dotenv.config() 

//variables
const port=process.env.PORT||5000
const app=express()
const mongo=process.env.MONGO_URI

//db conn
const connect=async()=>{
    try{
        await mongoose.connect(mongo)
    }
    catch(err){
        console.log(err)
    }
}
mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDB")
})

mongoose.connection.off("disconnected",()=>{
    console.log("Disconnected from MongoDB")
})
//express
app.use(cors())
app.listen(port,
    ()=>{
    connect()
    console.log(`server running on ${port}`)})

app.use(bodyParser.json())


app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV==='development',
}))

