function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
  let res = 0;
  for (let i = 0; i < fruits.length; i++) {
    for (let j = 0; j < baskets.length; j++) {
      if (baskets[j] >= fruits[i]) {
        res++;
        baskets[j] = 0;
        break;
      }
    }
  }
  return fruits.length - res;
}

export default numOfUnplacedFruits;
