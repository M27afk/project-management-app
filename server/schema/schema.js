import { projects,clients } from "../sampledata.js";
import {GraphQLObjectType,GraphQLList,GraphQLString,GraphQLID,GraphQLSchema} from 'graphql'

const ClientType = new GraphQLObjectType({
    name:'client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
})

const ProjectType = new GraphQLObjectType({
    name:'project',
    fields:()=>({
        id:{type:GraphQLID},
        client:{
            type:ClientType,
            resolve(parent,args){
                return clients.find(client=> client.id===parent.id)
            }
        },
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
    })
})

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return clients
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return clients.find(client=> client.id===args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),            
            resolve(parent,args){
                return projects;
            },
        },
        project:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return projects.find(project=> project.id===args.id)
            }
        }
    }
})

const schema=new GraphQLSchema({
    query:RootQuery
})
export default schema

 