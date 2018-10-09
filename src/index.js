const regexCloseSquareBracket = /]|^\[/g
const regexOpenSquareBracket = /\.?\[/g

module.exports = function (object, path, defaultValue) {
  // Handle the case that the object is undefined or not an object
  if (!object || Object(object) !== object) {
    return defaultValue
  }

  // A) If the path is an array, we can just use that
  // B) If the path is a string, convert it into an array using migrating
  //    array-style `[foo]` accessors into object-style `.foo` accessors
  const cleanPath = Object(path) === path
    ? path
    : path.replace(regexCloseSquareBracket, '').replace(regexOpenSquareBracket, '.').split('.')

  // Walk through the object
  let current = object

  for (const segment of cleanPath) {
    current = current[segment]

    if (!current) {
      return defaultValue
    }
  }

  return current
}
