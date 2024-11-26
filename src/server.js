import http from "node:http"
import { createHandlers } from "./handlers/handler.js"
import { readBodyMiddleware } from "./middlewares/read-body.js"
import { setJsonContentTypeMiddleware } from "./middlewares/set-json-content-type.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

createHandlers()

const server = http.createServer(async (req,res)=>{
  const { url, method } = req

  await readBodyMiddleware(req, res)
  setJsonContentTypeMiddleware(req, res)

  const route = routes.find(
    (route)=>route.method == method && route.path.test(url)
  )

  if(route){
    const routeParams = url.match(route.path)

    const { query, ...group} = routeParams.groups

    req.params = group

    req.query = extractQueryParams(query)

    return await route.handler(req,res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)