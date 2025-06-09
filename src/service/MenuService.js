const defaultMenuList = [
  {
    id: 1,
    name: "首页",
    path: "home",
    parent: 0,
    enable: true,
  },
  {
    id: 3,
    name: "订单",
    path: "order",
    parent: 0,
    enable: true,
  },
  // 将用户、菜单、角色列表提升为顶级菜单
  {
    id: 6,
    name: "用户信息管理",
    path: "user",
    parent: 0,
    enable: true,
    locked: true,
  },
  {
    id: 7,
    name: "左侧菜单管理",
    path: "menu",
    parent: 0,
    enable: true,
    locked: true,
  },
  {
    id: 8,
    name: "角色管理",
    path: "role",
    parent: 0,
    enable: true,
    locked: true,
  }
];

class MenuService {
  menuList = [];

  constructor() {
    this._getData();
  }

  getMenus() {
    return this.menuList.concat();
  }

  getDisplayMenus() {
    const buildTree = (menuList, parentId = 0) => {
      return menuList
          .filter((menu) => menu.enable && menu.parent === parentId)
          .map((menu) => {
            const children = buildTree(menuList, menu.id);
            return {
              ...menu,
              children: children.length ? children : undefined,
            };
          });
    };
    return buildTree(this.menuList);
  }

  addMenu(menu) {
    menu.id = this.menuList.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;
    this.menuList.push(menu);
    this._setData();
  }

  editMenu(menu) {
    const index = this.menuList.findIndex((m) => m.id === menu.id);
    if (index !== -1) {
      if (this.menuList[index].locked) {
        return;
      }
      this.menuList[index] = menu;
      this._setData();
    }
  }

  deleteMenu(id) {
    const index = this.menuList.findIndex((menu) => menu.id === id);
    if (index !== -1) {
      if (this.menuList[index].locked) {
        return;
      }
      this.menuList.splice(index, 1);
      this._setData();
    }
  }

  _getData() {
    const data = localStorage.getItem('menuList');
    if (data) {
      this.menuList = JSON.parse(data);
    } else {
      this.menuList = defaultMenuList;
      this._setData();
    }
  }

  _setData() {
    localStorage.setItem('menuList', JSON.stringify(this.menuList));
  }
}

export default MenuService;
