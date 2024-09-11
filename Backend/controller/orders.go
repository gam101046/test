package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sa-67-song_thor_sut/entity"
	"github.com/sa-67-song_thor_sut/config"
)

// GET /orders
func ListOrders(c *gin.Context) { //เข้าถึงข้อมูลคำสั่งซื้อทั้งหมด
	var orders []entity.Order

	db := config.DB()
	result := db.Preload("Member").Preload("Seller").Preload("Product_Orders").Find(&orders)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

// POST /orders
func CreateOrder(c *gin.Context) { // สร้างคำสั่งซื้อ
	var order entity.Order

	// bind เข้าตัวแปร order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่า MemberID กับ SellerID เชื่อมต่อกันหรือไม่
	var seller entity.Seller
	if err := db.Where("member_id = ?", order.MemberID).First(&seller).Error; err == nil { // พบ Seller ที่มี MemberID เดียวกัน
		if seller.ID == *order.SellerID { // ถ้า SellerID ที่พบตรงกับ SellerID ที่ส่งมา
			c.JSON(http.StatusBadRequest, gin.H{"error": "Buyer cannot purchase their own product"})
			return
		}
	}

	// สร้าง Order
	o := entity.Order{
		Quantity:    order.Quantity,
		Total_price: order.Total_price,
		MemberID:    order.MemberID,
		SellerID:    order.SellerID,
	}

	// บันทึก
	if err := db.Create(&o).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": o})
}



// GET /orders/:id
func GetOrder(c *gin.Context) { // เข้าถึงคำสั่งซื้อตาม id
	ID := c.Param("id")
	var order entity.Order

	db := config.DB()
	result := db.Preload("Member").Preload("Seller").Preload("Product_Orders").First(&order, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, order)
}

// PATCH /orders/:id
func UpdateOrder(c *gin.Context) { //อัพเดตคำสั่งซื้อตาม id
	var order entity.Order

	OrderID := c.Param("id")

	db := config.DB()
	result := db.First(&order, OrderID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&order)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DELETE /orders/:id
func DeleteOrder(c *gin.Context) { //ลบคำสั่งซื้อตาม id
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM orders WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

// GET /orders/member/:memberId
func GetOrdersByMemberID(c *gin.Context) { // เข้าถึงคำสั่งซื้อโดย MemberID
	memberID := c.Param("memberId")
	var orders []entity.Order

	db := config.DB()

	// ดึงคำสั่งซื้อที่เชื่อมโยงกับ MemberID
	result := db.Preload("Member").Preload("Seller").Preload("Product_Orders").Where("member_id = ?", memberID).Find(&orders)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	// ตรวจสอบว่า MemberID มีคำสั่งซื้อหรือไม่
	if len(orders) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No orders found for this member"})
		return
	}

	c.JSON(http.StatusOK, orders)
}
