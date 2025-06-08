import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { App, Layout } from "antd";

import UserDropdown from './components/UserDropdown';
import './App.css';
import { useEffect } from 'react';

const { Header } = Layout;

function XZApp() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
  if (location.pathname === '/') {
    navigate('/main/home');
  }
  }, [ /* eslint-disable-line react-hooks/exhaustive-deps */]);

  return (
    <App className="App">
      <Layout style={{minHeight: "100vh" }}>
        <Header style={{  background: "#f0f2f5", maxHeight:"10%", display: "flex", alignItems: "center" }}>
          <UserDropdown />
        </Header>
        <Outlet />
      </Layout>
    </App>
  );
}

export default XZApp;
