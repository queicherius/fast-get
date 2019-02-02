const regexCloseSquareBracket = /]|^\[/g
const regexOpenSquareBracket = /\.?\[/g

module.exports = function (object: any, path: Array<string | number> | string, defaultValue?: any) {
  // Handle the case that the object is undefined or not an object
  if (!object || Object(object) !== object) {
    return defaultValue
  }

  // A) If the path is an array, we can just use that
  // B) If the path is a string, convert it into an array by migrating
  //    array-style `[foo]` accessors into object-style `.foo` accessors
  const cleanPath = Array.isArray(path)
    ? path
    : path.replace(regexCloseSquareBracket, '').replace(regexOpenSquareBracket, '.').split('.')

  return get(object, cleanPath, defaultValue)
}

function get (object: object, path: Array<string | number>, defaultValue: any) {
  let current: any = object

  for (const segment of path) {
    current = current[segment]

    if (current == null) {
      return defaultValue
    }
  }

  return current
}
