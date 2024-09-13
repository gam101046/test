import { Member } from "../../interfaces/member";
import { Order } from "../../interfaces/orders";
import { Products_Orders } from "../../interfaces/products_orders";
import { Products } from "../../interfaces/products";
import { Seller } from "../../interfaces/seller";
import axios from 'axios';

const apiUrl = "http://localhost:8000";

// Member Management

// List all members
async function GetMembers() {
  try {
    const res = await axios.get(`${apiUrl}/member`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Get a member by ID
async function GetMemberById(id: number | undefined) {
  try {
    const res = await axios.get(`${apiUrl}/member/${id}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Create a new member
async function CreateMember(data: Member) {
  try {
    const res = await axios.post(`${apiUrl}/member`, data);
    return res.status === 201 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Update a member by ID
async function UpdateMember(id: number | undefined, data: Member) {
  try {
    const res = await axios.patch(`${apiUrl}/member/${id}`, data);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Delete a member by ID
async function DeleteMemberByID(id: number | undefined) {
  try {
    const res = await axios.delete(`${apiUrl}/member/${id}`);
    return res.status === 200;
  } catch (error) {
    return false;
  }
}

// Order Management

// List all orders
async function GetOrders() {
  try {
    const res = await axios.get(`${apiUrl}/orders`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Get an order by ID
async function GetOrderById(id: number | undefined) {
  try {
    const res = await axios.get(`${apiUrl}/orders/${id}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Create a new order
async function CreateOrder(data: Order) {
  try {
    const res = await axios.post(`${apiUrl}/orders`, data);
    return res.status === 201 ? res.data : false;
  } catch (error) {
    return false;
  }
}



// Delete an order by ID
async function DeleteOrder(id: number | undefined) {
  try {
    const res = await axios.delete(`${apiUrl}/orders/${id}`);
    return res.status === 200;
  } catch (error) {
    return false;
  }
}

// Product Management

// List all products
async function GetProducts() {
  try {
    const res = await axios.get(`${apiUrl}/products`)
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Get a product by ID
async function GetProductById(id: number | undefined) {
  try {
    const res = await axios.get(`${apiUrl}/products/${id}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Create a new product
async function CreateProduct(data: Products) {
  try {
    const res = await axios.post(`${apiUrl}/products`, data);
    return res.status === 201 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Update a product by ID
async function UpdateProduct(id: number | undefined, data: Products) {
  try {
    const res = await axios.patch(`${apiUrl}/products/${id}`, data);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Delete a product by ID
async function DeleteProduct(id: number | undefined) {
  try {
    const res = await axios.delete(`${apiUrl}/products/${id}`);
    return res.status === 200;
  } catch (error) {
    return false;
  }
}

// Products Order Management

// List all products-orders
async function GetProductsOrders() {
  try {
    const res = await axios.get(`${apiUrl}/products_orders`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Get a products-order by ID
async function GetProductsOrderById(id: number | undefined) {
  try {
    const res = await axios.get(`${apiUrl}/products_orders/${id}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Create a new products-order
async function CreateProductsOrder(data: Products_Orders) {
  try {
    const res = await axios.post(`${apiUrl}/products_orders`, data);
    return res.status === 201 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Update a products-order by ID
async function UpdateProductsOrder(id: number | undefined, data: Products_Orders) {
  try {
    const res = await axios.patch(`${apiUrl}/products_orders/${id}`, data);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Delete a products-order by ID
async function DeleteProductsOrder(id: number | undefined) {
  try {
    const res = await axios.delete(`${apiUrl}/products_orders/${id}`);
    return res.status === 200;
  } catch (error) {
    return false;
  }
}

// Seller Management

// Create a new seller
async function CreateSeller(data: Seller) {
  try {
    const res = await axios.post(`${apiUrl}/sellers`, data);
    return res.status === 201 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Get a seller by ID
async function GetSellerById(id: number | undefined) {
  try {
    const res = await axios.get(`${apiUrl}/sellers/${id}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Update a seller by ID
async function UpdateSeller(id: number | undefined, data: Seller) {
  try {
    const res = await axios.patch(`${apiUrl}/sellers/${id}`, data);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Delete a seller by ID
async function DeleteSeller(id: number | undefined) {
  try {
    const res = await axios.delete(`${apiUrl}/sellers/${id}`);
    return res.status === 200;
  } catch (error) {
    return false;
  }
}

async function GetOrdersByMemberId(memberId: number) {
  try {
    const res = await axios.get(`${apiUrl}/orders?member_id=${memberId}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

// Get all products-orders for a member
async function GetProductsByMemberId(memberId: number, page: number, pageSize: number) {
  try {
    const res = await axios.get(`${apiUrl}/products_by_member/${memberId}`, {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return res.status === 200 ? res.data : false;
  } catch (error) {
    return false;
  }
}

async function GetProductsBySellerId(sellerId: number, page: number, pageSize: number) {
  try {
    const res = await axios.get(`${apiUrl}/products/seller/${sellerId}`, {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return res.status === 200 ? res.data : false;
  } catch (error) {
    console.error("Error fetching products by seller ID:", error);
    return false;
  }
}



async function GetOrdersByProductIDAndMemberID(memberId: number, productId: number) {
  try {
    const res = await axios.get(`${apiUrl}/orders/member/${memberId}/product/${productId}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    console.error("Error fetching orders by Product ID and Member ID:", error);
    return false;
  }
}

async function GetOrdersByProductIDAndSellerID(sellerId: number, productId: number) {
  try {
    const res = await axios.get(`${apiUrl}/orders/seller/${sellerId}/product/${productId}`);
    return res.status === 200 ? res.data : false;
  } catch (error) {
    console.error("Error fetching orders by Product ID and Seller ID:", error);
    return false;
  }
}



export {
  GetMembers,
  GetMemberById,
  CreateMember,
  UpdateMember,
  DeleteMemberByID,
  GetOrdersByMemberId,

  GetOrders,
  GetOrderById,
  CreateOrder,
  DeleteOrder,


  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetProductsByMemberId,
  GetProductsBySellerId,
  GetOrdersByProductIDAndMemberID,
  GetOrdersByProductIDAndSellerID,

  GetProductsOrders,
  GetProductsOrderById,
  CreateProductsOrder,
  UpdateProductsOrder,
  DeleteProductsOrder,

  CreateSeller,
  GetSellerById,
  UpdateSeller,
  DeleteSeller
};
