
export const readBodyMiddleware = async (req = new http.IncomingMessage(),res = new http.ServerResponse())=>{
  const buf = []

  for await (let chunk of req){
    buf.push(chunk)
  }

  try {
    req.body = JSON.parse(buf.toString())
  } catch {
    req.body = {}
  }
}