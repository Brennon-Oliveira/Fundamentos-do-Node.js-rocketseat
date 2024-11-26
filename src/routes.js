import http from "node:http";
import { createRoutePath } from "./utils/create-route-path.js";

/**
 * @callback RouteHandler
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @returns {ServerResponse}
 */

/**
 * @typedef {Object} Route
 * @property {RegExp} path
 * @property {string} method,
 * @property {RouteHandler} handler
 */

/**
 * @type {Route[]}
 */
export const routes = [ ]

const defaultHandler = (
  req = new http.IncomingMessage(),
  res = new http.ServerResponse()
) => {
  return res
    .writeHead(501)
    .end()
}
/**
 * @typedef {Object} RouteFactory
 * @property {()=>Route} build
 * @property  {(method: string)=>RouteFactory} setMethod
 * @property {(handler: RouteHandler)=> RouteFactory|(handler: RouteHandler)=> Promise<RouteFactory>} setHandler
 * @property {(path: string)=>RouteFactory} setPath
 */

/**
 * @param {Route[]} routes
 * @returns {RouteFactory}
 */
export const routeBuilder = (routes = [])=>{
    const route = {
      path: new RegExp(),
      method: "GET",
      handler: defaultHandler
    }

    const factory = {}

    factory["build"] = ()=>{
      routes.push(route)
      return route
    }

    factory["setMethod"] = (method = "GET")=>{      
      route.method = method.toUpperCase()
      if (![
        "GET",
        "POST",
        "PATCH",
        "PUT",
        "DELETE"
      ].includes(route.method))
        throw new Error(`Método ${route.method}, no path ${route.path}, é inválido`)
      
      return factory
    }

    factory["setHandler"] = (
      handler = defaultHandler
    )=>{
      route.handler = handler
      return factory
    }

    factory["setPath"] = (path = "")=>{
      route.path = createRoutePath(path)
      return factory
    }

    return factory
  }