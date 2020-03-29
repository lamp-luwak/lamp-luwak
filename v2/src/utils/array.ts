
export function remove(target: any[], value: any) {
  let index = 0;
  while (index < target.length) {
    if (target[index] === value) {
      target.splice(index, 1);
    } else {
      index++;
    }
  }
}
