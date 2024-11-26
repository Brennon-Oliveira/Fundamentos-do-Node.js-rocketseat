import { databaseBuilder } from "../database.js"
import { routeBuilder } from "../routes.js"

/**
 * @param {Object} [configuration={}]
 * @param {import("../database.js").Database} [configuration.database]
 * @param {import("../routes.js").Route[]} [configuration.routes]
 */
export const createTaskHandlers = async (configuration = {})=>{

  const database = configuration.database || await databaseBuilder()
  const routes = configuration.routes || []

  routeBuilder(routes)
    .setPath("/tasks")
    .setMethod("GET")
    .setHandler((req,res)=>{
      const { search } = req.query

      const registers = database.get("tasks", search)

      return res.writeHead(200).end(JSON.stringify(registers))
    })
    .build()

  routeBuilder(routes)
    .setPath("/tasks")
    .setMethod("POST")
    .setHandler((req,res)=>{
      const { name, description } = req.body

      database.create("tasks", {name, description})

      return res.writeHead(204).end()
    })
    .build()

  routeBuilder(routes)
    .setPath("/tasks/:id")
    .setMethod("PUT")
    .setHandler((req, res)=>{
      const { id } = req.params
      const {name, description} = req.body

      database.update("tasks", id, {name, description})

      return res.writeHead(204).end()
    })
    .build()

  routeBuilder(routes)
    .setPath("/tasks/:id")
    .setMethod("DELETE")
    .setHandler((req, res)=>{
      const { id } = req.params 
      
      database.delete("tasks",id)

      return res.writeHead(204).end()
    })
    .build()

  routeBuilder(routes)
    .setPath("/tasks/:id/complete")
    .setMethod("PATCH")
    .setHandler((req, res)=>{
      const { id } = req.params 
      
      database.update("tasks",id , {completed_at: true})

      return res.writeHead(204).end()
    })
    .build()

}

