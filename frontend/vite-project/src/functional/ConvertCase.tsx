// @ts-ignore
function camelToSnake(obj: any) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }

  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const snakeKey = key.replace(
      /[A-Z]/g,
      (letter) => `_${letter.toLowerCase()}`,
    );
    // @ts-ignore
    acc[snakeKey] = camelToSnake(value);
    return acc;
  }, {});
}

export default camelToSnake;
