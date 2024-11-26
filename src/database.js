import { randomUUID } from "node:crypto"
import fs from "node:fs/promises"

let database = null
const databasePath = new URL('../db.json', import.meta.url)

/**
 * @typedef {Object} Database
 * @property {(table: string, data: Object) => Database} create
 * @property {(table: string, search?: string) => any} get
 * @property {(table: string, id: string, data: Object) => Database} update
 * @property {(table: string, id: string) => Database} delete
 */

// TODO: Fazer um repositório de tasks

/**
 * @returns {Promise<Database>}
 */
export const databaseBuilder = async ()=>{

  const factory = {}
  const persist = ()=>{
    fs.writeFile(databasePath, JSON.stringify(database))
  }
  
  if (!database){
    try {
      const file = await fs.readFile(databasePath, "utf-8")
      database = JSON.parse(file)
    } catch {
      database = {}
      persist()
    }
  }

  factory["create"] = (table = "", data = {})=>{
    if(!Array.isArray(database[table]))
      database[table] = []
    database[table].push(
      {
        ...data,
        id: randomUUID(),
        completed_at: null,
        updated_at: Date.now(),
        created_at: Date.now()
      })
    persist()
    return factory
  }

  factory["get"] = (table = "", search = "") =>{
    if(search){
      if(table == "tasks"){
        return database[table]
          .toLowerCase()
          .includes(search.toLowerCase())
      } 
    }
    return database[table]
  }

  factory["update"] = (table = "", id = "", data = {})=>{
    const register = database[table].find(register => register.id == id)
    if(table == "tasks"){
      if(data.name){
        register.name = data.name
      }
      if(data.description){
        register.description = data.description
      }
      if(data.completed_at){
        register.completed_at = data.completed_at
      }
    }
    register.updated_at = Date.now()
    persist()
    return factory
  }

  factory["delete"] = (table = "", id = "")=>{
    const registerIndex = database[table].findIndex(register => register.id == id)
    database[table].splice(registerIndex, 1)
    persist()
    return factory
  }

  return factory
}