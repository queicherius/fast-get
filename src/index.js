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
    : path.replace(/]|^\[/g, '').replace(/\.?\[/g, '.').split('.')

  // Go through the path and check if we can access every requested key
  // The requested key gets grabbed while checking for performance reasons
  const pathValid = cleanPath.every((step) => {
    return object && ((object = object[step]) !== undefined)
  })

  return pathValid ? object : defaultValue
}
