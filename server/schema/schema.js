import client from "../models/client.js";
import project from "../models/project.js";
import {GraphQLObjectType,GraphQLList,GraphQLNonNull,GraphQLString,GraphQLID,GraphQLSchema, GraphQLEnumType} from 'graphql'

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
                return client.findById(parent.clientId)
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
                return client.find()
            }
        },
        client:{
            type:ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return client.findById(args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),            
            resolve(parent,args){
               return project.find()
            },
        },
        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return project.findById(args.id)
            }
        }
    }
})

const mutation= new GraphQLObjectType({
    name:'Mutation',
    description:'Adding clients and projects',
    fields:{
        //client
        addClient:{
            type:ClientType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                phone:{type:new GraphQLNonNull(GraphQLString)},
            },
            resolve(parents,args){
                const newClient= new client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone
                })
                return newClient.save()
            }
        },
        deleteClient:{
            type:ClientType,
            args:{id:{type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                project.find({clientId:args.id}).then((projects)=>{
                    projects.forEach(element => {
                        element.deleteOne()
                    });
                })
                return client.findByIdAndDelete(args.id)
            }
        },
        updateClient:{
            type:ClientType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                phone:{type: GraphQLString}
           },
            resolve(parent,args){
                return client.findByIdAndUpdate(args.id,
                    {
                        $set:{
                            name:args.name,
                            phone:args.phone,
                            email:args.email,
                        },
                    },
                    {new:true}
                    )
            }
        },

        //project
        addProject:{
            type:ProjectType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                description:{type:new GraphQLNonNull(GraphQLString)},
                status:{type:new GraphQLEnumType({
                    name:'ProjectStatus',
                    values:{
                        'new':{value:"Analysis"},
                        'progress':{value:"In Progress"},
                        'completed':{value:"Completed"},
                    }
                }),
                defaultValue:"Analysis"
                },
                clientId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parents,args){
                const newProject= new project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    clientId:args.clientId
                })
                return newProject.save()
            }
        },
        deleteProject:{
            type:ProjectType,
            args:{id:{type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                return project.findByIdAndDelete(args.id)
            }
        },
        updateProject:{
            type:ProjectType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                description:{type: GraphQLString},
                status:{type:new GraphQLEnumType({
                    name:'ProjectStatusUpdate',
                    values:{
                        'new':{value:"Analysis"},
                        'progress':{value:"In Progress"},
                        'completed':{value:"Completed"},
                    }
                }),
                defaultValue:"Analysis"
                },
                clientId:{type: GraphQLID}
           },
            resolve(parent,args){
                return project.findByIdAndUpdate(args.id,
                    {
                        $set:{
                            name:args.name,
                            description:args.description,
                            status:args.status,
                            clientId:args.clientId
                        },
                    },
                    {new:true}
                    )
            }
        },           
        

    }
})

const schema=new GraphQLSchema({
    query:RootQuery,
    mutation
})
export default schema

 