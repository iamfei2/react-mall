import UserService from "./UserService";
const defaultRoleList = [
    {
      id: 1,
      name: "管理员",
      desc: "拥有所有功能",
      menu: ["*"],
      enable: true,
    },
    {
      id: 4,
      name: "一般用户",
      desc: "只能查看首页",
      menu: [1],
      enable: true,
    },
  ]
  class RoleService {
    roleList = [];
    userService = new UserService(); // 添加对 UserService 的引用
  
    constructor() {
      this._getData();
    }
  
    getRoles() {
      return this.roleList.concat();
    }
  
    getRole(id) {
      return this.roleList.find((role) => role.id === id);
    }
  
    addRole(role) {
      role.id = this.roleList.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
      this.roleList.push(role);
      this._setData();
    }
  
    editRole(role) {
      const index = this.roleList.findIndex((r) => r.id === role.id);
      if (index !== -1) {
        this.roleList[index] = role;
        this._setData();
      }
    }
  
    deleteRole(id) {
      if (id === 1) {
        return;
      }
  
      const index = this.roleList.findIndex((role) => role.id === id);
      if (index !== -1) {
        this.roleList.splice(index, 1);
        this._setData();
      }
    }
  
    // 获取角色的用户数量
    getRoleUserCount(roleId) {
      const users = this.userService.getUsers();
      return users.filter(user => user.role.includes(roleId)).length;
    }
  
    _getData() {
      const data = localStorage.getItem('roleList');
      if (data) {
        this.roleList = JSON.parse(data);
      } else {
        this.roleList = defaultRoleList;
        this._setData();
      }
    }
  
    _setData() {
      localStorage.setItem('roleList', JSON.stringify(this.roleList));
    }
  }
  
  export default RoleService;