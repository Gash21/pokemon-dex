export const generate = (number) => {
  return new Promise((resolve) => {
    for (var arr = [], i = 0; i < 100; ++i) arr[i] = i;

    const shuffle = (array) => {
      var tmp, current, top = array.length;
      if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }

    arr = shuffle(arr).slice(0, 50);
    let result = arr.indexOf(number) > -1 ? true : false;
    resolve(result);
    return result;
  })
}