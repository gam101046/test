
import "./Index.css";
import Bag from "/Users/gam/sa-67-song_thor_sut/frontend/public/กระเป๋า.png";
import Logo from "/Users/gam/sa-67-song_thor_sut/frontend/public/4-Photoroom.png";
import ShoppingCartIcon from "/Users/gam/sa-67-song_thor_sut/frontend/public/shopping-cart.png";
import List from "/Users/gam/sa-67-song_thor_sut/frontend/public/list.png";
import Notification from "/Users/gam/sa-67-song_thor_sut/frontend/public/notifications-button.png";
import Back from "/Users/gam/sa-67-song_thor_sut/frontend/public/back.png";
import Incorrect from "/Users/gam/sa-67-song_thor_sut/frontend/public/incorrect.png";
import Doll from "/Users/gam/sa-67-song_thor_sut/frontend/public/453661947_1621965685250654_542341177874723406_n.png";
import Success from "/Users/gam/sa-67-song_thor_sut/frontend/public/success.png";
import Fan from "/Users/gam/sa-67-song_thor_sut/frontend/public/453361353_1976000756205346_5786704057306203783_n.png";
const Index = () => {
  return (
    <div className='index'>
      <h1>รายการคำสั่งซื้อ</h1>
      <img src={Success} className='my-image' />
      <h2>สำเร็จ</h2>
      <img src={Incorrect} className='my-image1' />
      <h3>ยกเลิกแล้ว</h3>
      <div className='product'>
        <h4>รายละเอียดสินค้า</h4>
        <h5>ราคาสินค้า</h5>
        <h6>จำนวน</h6>
        <div className="line"></div>
        <button className="cancel">ยกเลิก</button>
        <img src={Bag} className='my-image-bag' />
      </div>
      <div className='product2'>
        <h4>รายละเอียดสินค้า</h4>
        <h5>ราคาสินค้า</h5>
        <h6>จำนวน</h6>
        <div className="line"></div>
        <button className="cancel">ยกเลิก</button>
        <img src={Doll} className='my-image-doll' />
      </div>
      <div className='product3'>
        <h4>รายละเอียดสินค้า</h4>
        <h5>ราคาสินค้า</h5>
        <h6>จำนวน</h6>
        <div className="line"></div>
        <button className="cancel">ยกเลิก</button>
        <img src={Fan} className='my-image-fan' />
      </div>
      <img src={Logo} className='logo' alt='Course Logo' />
      <div className='right-section'>
        <div className='links'>
          <div className="search">
            <input type="text" placeholder="search" />
          </div>
          <button className="button-login">สร้างการขาย</button>
          <button className='button-icon button-icon1'>
            <img src={ShoppingCartIcon} alt='Shopping Cart' />
          </button>
          <button className='button-icon button-icon2'>
            <img src={List} alt='List' />
          </button>
          <button className='button-icon button-icon3'>
            <img src={Notification} alt='Notification' />
          </button>
          <button className='button-icon button-icon4'>
            <img src={Back} alt='Back' />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Index;
