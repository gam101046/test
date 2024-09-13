import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetProducts } from "../../services/http/index";
import "./index.css";
import Logo from "/Users/gam/sa-67-song_thor_sut/frontend/public/4-Photoroom.png";
import Back from "/Users/gam/sa-67-song_thor_sut/frontend/public/back.png";
import Chat from "/Users/gam/sa-67-song_thor_sut/frontend/public/chat.png";
import List from "/Users/gam/sa-67-song_thor_sut/frontend/public/list.png";
import Notification from "/Users/gam/sa-67-song_thor_sut/frontend/public/notifications-button.png";
import ShoppingCartIcon from "/Users/gam/sa-67-song_thor_sut/frontend/public/shopping-cart.png";

const { Meta } = Card;

interface Product {
  ID: number;
  Title: string;
  Price: number;
  Picture_product: string;
  Description: string;
  SellerID: number;
  OrderID?: number;
}

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const result = await GetProducts(); // Fetch all products
      console.log('API result:', result); // ตรวจสอบผลลัพธ์ที่ได้จาก API
      if (Array.isArray(result)) {
        setProducts(result); // ตั้งค่าข้อมูลสินค้าเป็นอาร์เรย์ที่ได้รับ
      } else {
        console.error('Data format is incorrect:', result);
        messageApi.open({
          type: "error",
          content: "ข้อมูลที่ได้รับจาก API ไม่ถูกต้อง",
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
      });
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const goToProductPage = () => {
    navigate('/');
  };

  return (
    <div className="index">
      {contextHolder}
      <h1>My Products</h1>
      <Button className="button-review">รีวิว</Button>
      <Button className="button-score">คะแนนร้านค้า</Button>
      <Button className="button-product">เพิ่มสินค้า</Button>
      <Button className='button-icon button-icon5'>
        <img src={Chat} alt='Chat' />
      </Button>
      <img src={Logo} className="logo" alt="Course Logo" />
      <div className="right-section">
        <div className="links">
          <Button className="button-icon button-icon1">
            <img src={ShoppingCartIcon} alt="Shopping Cart" />
          </Button>
          <Button className="button-icon button-icon2">
            <img src={List} alt="List" />
          </Button>
          <Button className="button-icon button-icon3">
            <img src={Notification} alt="Notification" />
          </Button>
          <Button className="button-icon button-icon4" onClick={goToProductPage}>
            <img src={Back} alt="Back" />
          </Button>
        </div>
      </div>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <Card
              key={product.ID}
              hoverable
              style={{ width: 240, margin: '10px' }}
              cover={<img alt={product.Title} src={product.Picture_product || 'https://via.placeholder.com/240'} />}
            >
              <Meta title={product.Title} description={`ราคา: ${product.Price} บาท`} />
            </Card>
          ))
        ) : (
          <p>ไม่มีสินค้าที่แสดงผล</p>
        )}
      </div>
    </div>
  );
};

export default Index;
