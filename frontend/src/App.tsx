import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, Layout, theme, MenuProps } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  WechatOutlined,
  UnorderedListOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import Navbar from './page/Buy-products/Byproduct';
import Index from './page/Order/Index';
import Index1 from './page/Purchase-list/Index';
import logo from '/Users/gam/sa-67-song_thor_sut/frontend/public/458749239_1453530818692848_5200534269192406191_n.png';
import './App.css';

const { Header, Content, Sider } = Layout;

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

const items: MenuItem[] = [
  {
    key: 'sub4',
    label: '',
    icon: <UnorderedListOutlined  />,
    children: [
      { key: '1', label: 'บัญชีของฉัน' ,icon: <UserOutlined/>},
      { key: '2', label: 'คำสั่งซื้อของฉัน' ,icon: <UnorderedListOutlined/>},
      { key: '3', label: 'ร้านค้าของฉัน' ,icon: <ShopOutlined/>},
    ],
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('1');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '130vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: '100%' }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
          >
            <Menu.Item key="dashboard">
              <Link to="/">
              <HomeOutlined />
                <span>หน้าหลัก</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="index1">
              <Link to="/index">
              <WechatOutlined />
                <span>แชท</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="index">
              <Link to="/product">
                <UserOutlined />
                <span>ข้อมูลสินค้า</span>
              </Link>
            </Menu.Item>
          </Menu>
          <Menu
            defaultSelectedKeys={[current]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onClick={onClick}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: '0 16px' }}>
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
