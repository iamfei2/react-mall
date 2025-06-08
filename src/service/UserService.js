const defaultUserList = [
    {
      id: 1,
      username: "admin",
      email: "admin@bjtu.com",
      password: "123456",
      name: "管理员",
      role: [1],
      enable: true,
    },
    {
      id: 2,
      username: "storeKeeper",
      email: "store@bjtu.com",
      password: "123456",
      name: "商品管理员",
      role: [2],
      enable: true,
    },
    {
      id: 3,
      username: "order",
      email: "order@bjtu.com",
      password: "123456",
      name: "订单管理员",
      role: [3],
      enable: true,
    },
    {
      id: 4,
      username: "Customer1",
      email: "customer1@bjtu.com",
      password: "Customer1",
      name: "customer1",
      role: [4],
      enable: true,
    },
    {
      id: 5,
      username: "customer2",
      email: "customer2@bjtu.com",
      password: "Xz123456",
      name: "customer2",
      role: [4],
      enable: true,
    },
  ];
  
  class UserService {
    userList = [];
    currentUserId = null; // 当前登录用户的id
  
    constructor() {
      this._getData();
    }
  
    login(username, password, remember) {
      // 比较用户名和密码，如果正确则返回用户信息，否则返回null
      const user = this.userList.find((u) => u.username === username && u.password === password);
      if (user) {
        this.currentUserId = user.id;
        if (remember) {
          localStorage.setItem('currentUserId', user.id);
        }
      }
      return !!user;
    }
  
    logout() {
      this.currentUserId = null;
      localStorage.removeItem('currentUserId');
    }
  
    register(username, password, email) {
      // 检查用户名是否已经存在，如果不存在则创建用户并返回用户信息，否则返回null
      if (this.userList.find((u) => u.username === username)) {
        return null;
      }
  
      const user = {
        id: 0,
        username,
        password,
        name: username,
        email: email,
        role: [],
        enable: true,
      };
      this.addUser(user);
      return user;
    }
  
    getCurrentUser() {
      if (!this.currentUserId) {
        this.currentUserId = localStorage.getItem('currentUserId');
      }
      return this.userList.find((u) => u.id === parseInt(this.currentUserId));
    }
  
    getUsers() {
      return this.userList.concat();
    }
  
    addUser(user) {
      user.id = this.userList.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
      this.userList.push(user);
      this._setData();
    }
  
    editUser(user) {
      const index = this.userList.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.userList[index] = user;
        this._setData();
      }
    }
  
    deleteUser(id) {
      if (id === 1) {
        return;
      }
  
      const index = this.userList.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.userList.splice(index, 1);
        this._setData();
      }
    }
  
    _getData() {
      const data = localStorage.getItem('userList');
      if (data) {
        this.userList = JSON.parse(data);
      } else {
        this.userList = defaultUserList;
        this._setData();
      }
    }
  
    _setData() {
      localStorage.setItem('userList', JSON.stringify(this.userList));
    }
  }
  
  export default UserService;
  