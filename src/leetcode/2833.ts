function furthestDistanceFromOrigin(moves: string): number {
  // const ms = [...moves];
  const map: Record<string, number> = {
    L: 0,
    R: 0,
    _: 0
  };
  for (const m of moves) {
    map[m] = map[m] ? map[m] + 1 : 1;
  }
  return Math.abs(map['L'] - map['R']) + map['_'];
}

export default furthestDistanceFromOrigin;
