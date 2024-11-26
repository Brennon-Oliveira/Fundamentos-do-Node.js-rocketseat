import { routes } from "../routes.js"
import { createTaskHandlers } from "./task.js"

export const createHandlers = ()=>{
  createTaskHandlers({routes})
}