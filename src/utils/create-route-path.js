
export const createRoutePath = (path = "")=>{
  const pathParamsRegex = /:([a-zA-Z][a-zA-Z0-9_]*)/g

  const newPath = path.replaceAll(pathParamsRegex, "(?<$1>[a-zA-Z0-9_\-]+)")

  return new RegExp(`^${newPath}(?<query>\\?(.*))?$`)
}