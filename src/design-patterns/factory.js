/**
 * 新建用户选择用户权限
 * 如管理员，超级管理员，普通员工等
 * 创建user的工厂
 */

// 每种用户只能看见特定的页面
class User {
  constructor(role, pages) {
    this.role = role;
    this.pages = pages;
  }
  static UserFactory = (role) => {
    switch (role) {
      case 'superadmin':
        return new User('superadmin', ['home', 1, 2, 3]);
      case 'admin':
        return new User('admin', ['home', 1, 2, 3]);
      case 'user':
        return new User('user', ['home', 1, 2, 3]);
      default:
        throw new Error('bad args');
    }
  };
}

export default User;
