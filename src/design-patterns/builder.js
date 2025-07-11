class Navbar {
  init() {
    console.log('navbar-init');
  }
  getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('navbar-getData');
      }, 1000);
    });
  }
  render() {
    console.log('navbar-render');
  }
}
class List {
  init() {
    console.log('List-init');
  }
  getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('List-getData');
      }, 1000);
    });
  }
  render() {
    console.log('List-render');
  }
}

class Creator {
  async startBuild(builder) {
    await builder.init();
    await builder.getData();
    await builder.render();
  }
}

const op = new Creator();
op.startBuild(new List());
op.startBuild(new Navbar());
