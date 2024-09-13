
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, Layout, theme, DatePicker } from "antd";
import { UserOutlined, DashboardOutlined } from "@ant-design/icons";

import Navbar from './page/Buy-products/Navbar';
import Index from './page/Order/Index';
import Index1 from './page/Purchase-list/Index';
import logo from "/Users/gam/sa-67-song_thor_sut/frontend/public/458749239_1453530818692848_5200534269192406191_n.png";
import "./App.css"

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label: React.ReactNode;
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
          >
            <Menu.Item key="dashboard">
              <Link to="/">
                <DashboardOutlined />
                <span>แดชบอร์ด</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="index1">
              <Link to="/index">
                <UserOutlined />
                <span>รายการซื้อ</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="index">
              <Link to="/product">
                <UserOutlined />
                <span>ข้อมูลสินค้า</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout >
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route path="/" element={<Navbar />} />
              <Route path="/index" element={<Index1 />} />
              <Route path="/product" element={<Index />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
