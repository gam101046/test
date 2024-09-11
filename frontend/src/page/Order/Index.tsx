

import "./Index.css";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { GetProductsByMemberId } from "../../services/http/index";
import Logo from "/Users/gam/sa-67-song_thor_sut/frontend/public/4-Photoroom.png";
import ShoppingCartIcon from "/Users/gam/sa-67-song_thor_sut/frontend/public/shopping-cart.png";
import List from "/Users/gam/sa-67-song_thor_sut/frontend/public/list.png";
import Notification from "/Users/gam/sa-67-song_thor_sut/frontend/public/notifications-button.png";
import Back from "/Users/gam/sa-67-song_thor_sut/frontend/public/back.png";
import Orders from "/Users/gam/sa-67-song_thor_sut/frontend/public/453541754_320685961127597_6939654093959649898_n.png";
import Chat from "/Users/gam/sa-67-song_thor_sut/frontend/public/chat.png";

interface Product {
  ID: number;
  Title: string;
  Price: number;
  Picture_product: string;
  Description: string;
  SellerID: number;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  
  // Modal state
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<string>();
  const [deleteId, setDeleteId] = useState<number>();

  // Function to fetch products with pagination
  const fetchProducts = async (page: number = 1, pageSize: number = 10) => {
    try {
      const result = await GetProductsByMemberId(1, page, pageSize);
      if (result && Array.isArray(result.products)) {
        setProducts(result.products);
      } else {
        console.error("Invalid data format:", result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "Title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
      render: (price) => `฿${price}`,
    },
    {
      title: "Picture",
      dataIndex: "Picture_product",
      key: "picture",
      render: (text, record) => (
        <img src={record.Picture_product} alt={record.Title} width="170" />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const showModal = (product: Product) => {
    setModalText(`คุณต้องการลบข้อมูลสินค้าชื่อ "${product.Title}" หรือไม่?`);
    setDeleteId(product.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    await DeleteProductByID(deleteId); // Add DeleteProductByID function if needed
    setOpen(false);
    setConfirmLoading(false);
    messageApi.open({
      type: "success",
      content: "ลบข้อมูลสินค้าสำเร็จ",
    });
    fetchProducts(); // You may need to pass page and pageSize here if implementing pagination
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const goToProductPage = () => {
    navigate('/');
  };

  return (
    <div className='index'>
      {contextHolder}
      <h1>My Orders</h1>
      <img src={Orders} className='my-image' alt='Orders' />
      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.ID} className='product'>
              <div className="line"></div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      
      <img src={Logo} className='logo' alt='Course Logo' />
      <div className='right-section'>
        <div className='links'>
          <Button className="button-review">รีวิว</Button>
          <Button className="button-score">คะแนนร้านค้า</Button>
          <Button className="button-product">เพิ่มสินค้า</Button>
          <Button className='button-icon button-icon1'>
            <img src={ShoppingCartIcon} alt='Shopping Cart' />
          </Button>
          <Button className='button-icon button-icon2'>
            <img src={List} alt='List' />
          </Button>
          <Button className='button-icon button-icon3'>
            <img src={Notification} alt='Notification' />
          </Button>
          <Button className='button-icon button-icon5'>
            <img src={Chat} alt='Chat' />
          </Button>
          <Button className='button-icon button-icon4' onClick={goToProductPage}>
            <img src={Back} alt='Back' />
          </Button>
        </div>
      </div>

      <Table
        rowKey="ID"
        columns={columns}
        dataSource={products}
        className="columns"
        pagination={{
          pageSize: 2,
          onChange: (page, pageSize) => {
            fetchProducts(page, pageSize);
          },
        }}
      />
      <Modal
        title="ลบข้อมูลสินค้า?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default Index;
