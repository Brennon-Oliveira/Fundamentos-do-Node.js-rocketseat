import http from "node:http"

export const setJsonContentTypeMiddleware = (req = new http.IncomingMessage(),res = new http.ServerResponse())=>{
  res.setHeader("Content-type", "application/json")
}