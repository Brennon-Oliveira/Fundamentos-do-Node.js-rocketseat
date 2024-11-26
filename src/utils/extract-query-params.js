
export const extractQueryParams = (query = "")=>{
  return query.substring(1,query.length).split("&").reduce(
    (queryParams, param)=>{
      const [key, value] = param.split("=")

      queryParams[key] = value

      return queryParams
    }, {}
  )
}