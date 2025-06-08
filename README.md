# Weighiting-MALL-WEB



## 项目结构

```
    XZ-MALL-WEB/    /*省略了部分文件*/
    │
    ├── public/
    │   └── index.html
    │
    ├── src/
    │   ├── components/
    │   │   ├── menu/ 
    │   │   │   └── MenuEditModal.js
    │   │   ├── role/ 
    │   │   │   ├── RoleEditModal.js
    │   │   │   └── RoleMenuEditModal.js
    │   │   ├── user/ 
    │   │   │   ├── UserEditModal.js
    │   │   │   └── UserRoleEditModal.js
    │   │   ├── SideMenu.js
    │   │   ├── UserDropdown.js
    │   ├── contexts/
    │   │   ├── ServiceContext.js
    │   ├── hooks/
    │   │   ├── LoginCheck.js
    │   ├── pages/
    │   │   ├── CustomPage.js
    │   │   ├── GoodPage.js
    │   │   ├── HomePage.js
    │   │   ├── LoginPage.js
    │   │   ├── MainPage.js
    │   │   ├── MarketingPage.js
    │   │   ├── MenuPage.js
    │   │   ├── OrderPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── RolePage.js
    │   │   └── UserPage.js
    │   ├── service/
    │   │   ├── MenuService.js
    │   │   ├── RoleService.js
    │   │   └── UserService.js
    │   ├── App.js
    │   ├── index.js
    │   └── router.js
    │
    ├── README.md
    ├── package.json
    └── .gitignore
```

### 各文件夹说明

1. **page 文件夹**：
   
    - **职责**：每个页面的逻辑和内容。
    - **分类**：
      - `CustomPage`为调试界面，为后续用户界面做准备
      - `LoginPage、RegisterPage`分别负责登录与注册
      - `MainPage`为一个容器界面，包含导航栏、侧边栏、内容区域，其他页面填充至内容区域
      - `UserPage、MenuPage、RolePage`分别为用户管理、菜单管理、权限管理页面（添加、删除逻辑）
      - `HomePage`为首页，`GoodPage、OrderPage、MarketingPage`无内容
    
2. **component 文件夹**：
   
    - **职责**：各个编辑弹窗的逻辑和内容，弹窗负责内容更改逻辑
    - **分类**：
      - `components/menu/*.js`提供菜单编辑弹窗
      - `components/user/*.js`提供用户编辑弹窗
      - `components/role/*.js`提供权限编辑弹窗
      - `components/SideMenu.js`提供侧边栏的显示服务，根据不同权限用户显示不同侧边栏
      - `components/UserDropdown.js`提供用户状态查询和注销功能
    
3. **service 文件夹**：
    - **职责**：将逻辑设计转化为服务类
    - **内容**： `service/*.js` 定义了各个服务类，通过类中的方法实现内容的编辑、显现等，与存储相关的localStorage直接交互

4. **contexts 文件夹**：
   
    - **职责**：整合给个服务，提供上下文，充当服务提供者。

    - **内容**： `ServiceContext.js`，它们使用 React 的 Context API 将服务类实例注入到组件树中，以便在任何组件中访问这些服务，通过下面引入方式，实现数据的增删改查
    
      ```
      import { ServiceContext } from "../contexts/ServiceContext";
      ```
    
    
    
5. **hooks 文件夹**：
   
    - **职责**：检查登录状态

6. **app.js**：

    - **职责**：定义整个应用全局配置。
    - **内容**：通常包含路由定义（使用 `react-router-dom` 等库），全局状态提供者（例如 `ServiceContext.Provider`），全局布局组件等。它是应用的核心配置文件，负责将不同的页面和组件串联起来。

7. **router.js**:
   
    - **职责**：定义整个应用的路由
    
8. **index.js**：

    - **职责**：应用的入口文件，负责启动整个应用。

    - **内容**：通过 `ReactDOM.render` 方法，将 `App` 组件挂载到 HTML 中的 `root` 节点，在 `index.js` 中，应用的全局样式和配置文件会被引入。

      

### 组件使用：Ant Design



## 运行及代码示例

执行 `npm intall` 完成环境配置

执行 `npm start` 在localhost:3000启动应用



#### **特别注意**：

使用`localStorage`来存储数据，编辑数据可被在浏览器缓存中长时间保存

若需要每次刷新启动恢复原始数据，将`MainPage.js`中`// localStorage.clear();` 取消注释

这样每次启动时会清除缓存，各个service在读到空数据后会设定`default`数据


