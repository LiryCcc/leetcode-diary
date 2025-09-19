class User {
  constructor(name, role, pages) {
    this.name = name;
    this.role = role;
    this.pages = pages;
  }

  welcome() {
    console.log(`welcome ${this.name}`);
  }
  dataShow() {
    throw new Error('抽象方法需要被实现');
  }
}

class SuperAdmin extends User {
  constructor(name) {
    super(name, 'superAdmin', ['home', 1, 2, 3]);
  }
  dataShow() {
    console.log('superAdmin-dataShow');
  }
  addRight() {}
  addUser() {}
}

class Admin extends User {
  constructor(name) {
    super(name, 'admin', ['home', 1, 2]);
  }
  addUser() {}
  dataShow() {
    console.log('admin-dataShow');
  }
}

class Editor extends User {
  constructor(name) {
    super(name, 'editor', ['home', 1]);
  }
  dataShow() {
    console.log('editor-dataShow');
  }
}

/**
 * 根据传入的职责，return响应的类
 */
function getAbstractUserFactory(role) {
  switch (role) {
    case 'superAdmin':
      return SuperAdmin;
    case 'admin':
      return Admin;
    case 'editor':
      return Editor;

    default:
      throw new Error('错误');
  }
}
let UserClass = getAbstractUserFactory('editor');
// console.log(UserClass)
let _user = new UserClass('liry');
