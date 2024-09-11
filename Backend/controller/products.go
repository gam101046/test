package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sa-67-song_thor_sut/entity"
	"github.com/sa-67-song_thor_sut/config"
)

// GET /products
func ListProducts(c *gin.Context) { // เข้าถึงข้อมูลสินค้าทั้งหมด
	var products []entity.Product

	db := config.DB()
	result := db.Preload("Seller").Preload("Product_Orders").Find(&products)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

// POST /products
func CreateProduct(c *gin.Context) { // สร้างข้อมูลสินค้า
	var product entity.Product

	// bind เข้าตัวแปร product
	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// สร้าง Product
	p := entity.Product{
		Title:           product.Title,
		Description:     product.Description,
		Price:           product.Price,
		Category:        product.Category,
		Picture_product: product.Picture_product,
		Condition:       product.Condition,
		Weight:          product.Weight,
		Status:          product.Status,
		SellerID:        product.SellerID,
	}

	// บันทึก
	if err := db.Create(&p).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": p})
}

// GET /products/:id
func GetProduct(c *gin.Context) { //เข้าถึงข้อมูลสินค้าตาม id
	ID := c.Param("id")
	var product entity.Product

	db := config.DB()
	result := db.Preload("Seller").Preload("Product_Orders").First(&product, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, product)
}

// PATCH /products/:id
func UpdateProduct(c *gin.Context) { //อัพเดตข้อมูลตาม id
	var product entity.Product

	ProductID := c.Param("id")

	db := config.DB()
	result := db.First(&product, ProductID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&product)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DELETE /products/:id
func DeleteProduct(c *gin.Context) { //ลบข้อมูลตาม id
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM products WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}


func GetProductsByMemberID(c *gin.Context) {
    memberID := c.Param("member_id")
    var products []entity.Product

    db := config.DB()

    // Query to join tables and filter by member_id
    result := db.
        Joins("JOIN products_orders ON products_orders.product_id = products.id").
        Joins("JOIN orders ON orders.id = products_orders.order_id").
        Where("orders.member_id = ?", memberID).
        Preload("Seller").
        Find(&products)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"products": products})
}


func GetProductsBySellerID(c *gin.Context) {
    sellerID := c.Param("seller_id")
    var products []entity.Product

    db := config.DB()
    result := db.
        Joins("JOIN products_orders ON products_orders.product_id = products.id").
        Joins("JOIN orders ON orders.id = products_orders.order_id").
        Where("orders.seller_id = ?", sellerID).
        Preload("Seller").
        Find(&products)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"products": products})
}
