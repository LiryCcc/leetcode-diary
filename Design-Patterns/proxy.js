class Star {
  play() {
    console.log('play');
  }
}
class StarProxy {
  constructor() {
    this.superStar = new Star();
  }
  talk(price) {
    if (price >= 10000) {
      this.superStar.play();
    } else {
      throw new Error('price is too low');
    }
  }
}

setTimeout(() => {
  console.log('time out');
}, 10000000);

export default StarProxy;
