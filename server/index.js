import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"

import { graphqlHTTP } from "express-graphql"
import schema from '../server/schema/schema.js'
dotenv.config() 

const port=process.env.PORT||5000
const app=express()

app.listen(port,console.log(`server running on ${port}`))

app.use(bodyParser.json())
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:process.env.NODE_ENV==='development',
}))

