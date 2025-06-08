import React, { useContext } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { ServiceContext } from "../contexts/ServiceContext";

const SideMenu = () => {
  const { menu: menuService, user: userService, role: roleService } = useContext(ServiceContext);

  // 获取当前用户
  const user = userService.getCurrentUser();

  // 根据用户角色ID获取角色信息
  let roles = [];
  if (user) {
    roles = user.role.map(roleId => roleService.getRole(roleId));
  }

  // 获取用户可见的菜单集合
  let visibleMenus = new Set();
  if (roles.length > 0) {
    visibleMenus = new Set(roles.flatMap(role => role.menu));
  }

  // 判断用户是否具有查看所有菜单的权限（管理员角色）
  let canSeeAllMenus = false;
  if (user) {
    canSeeAllMenus = user.role.includes(1);
  }

  const buildMenuItems = menus => menus.filter(menu => {
    return menu.id === 1 || canSeeAllMenus || visibleMenus.has(menu.id);
  }).map(menu => {
    const item = {
      key: menu.id,
      label: <Link to={`/main/${menu.path}`}>{menu.name}</Link>,
    }
    if (menu.children) {
      item.children = buildMenuItems(menu.children);
    }
    return item;
  });
  const menuItems = buildMenuItems(menuService.getDisplayMenus());

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["home"]}
      defaultOpenKeys={["permission"]}
      style={{
        height: "100%",
        borderRight: 0,
      }}
      items={menuItems}
    />
  )
}

export default SideMenu;