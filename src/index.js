export default function (object, path, defaultValue) {
  // Handle the case that the object is not an object / undefined
  if (!object || Object(object) !== object) {
    return defaultValue
  }

  // Either the path is an array, or it has to be created from the string,
  const cleanPath = Object(path) === path ? path : pathFromString(path)

  // Go through the path and check if we can access every requested key
  // The requested key gets grabbed while checking for efficiency
  const pathValid = cleanPath.every((step) => {
    return (object = object[step]) !== undefined
  })

  return pathValid ? object : defaultValue
}

// Convert array-style `[foo]` accessors into object-style `.foo` accessors
function pathFromString (string) {
  return string.replace(/]|^\[/g, '').replace(/\.?\[/g, '.').split('.')
}
