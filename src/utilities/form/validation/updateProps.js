export const updateProps = (oldObject, newObject, ignoreKeys) => {
  let updatedObject = Object.assign({}, newObject);

  for (const oldKey in oldObject) {
    if (Object.hasOwnProperty.call(oldObject, oldKey)) {
      for (const newKey in newObject) {
        if (Object.hasOwnProperty.call(newObject, newKey)) {
          if (oldKey === newKey && oldObject[oldKey] === newObject[newKey]) {
            delete updatedObject[newKey];
          } else if (ignoreKeys && ignoreKeys.some((k) => k === newKey)) {
            delete updatedObject[newKey];
          }
        }
      }
    }
  }
  return Object.keys(updatedObject).length === 0 &&
    updatedObject.constructor === Object
    ? null
    : updatedObject;
};
