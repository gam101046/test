package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sa-67-song_thor_sut/entity"
	"github.com/sa-67-song_thor_sut/config"
)


func CreateSeller(c *gin.Context) { // สร้างข้อมูลผู้ขาย
	var seller entity.Seller

	// bind เข้าตัวแปร seller
	if err := c.ShouldBindJSON(&seller); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var member entity.Member
	db.First(&member, seller.MemberID)
	if member.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "member not found"})
		return
	}

	// สร้าง Seller
	s := entity.Seller{
		Year:           seller.Year,
		InstituteOf:    seller.InstituteOf,
		Major:          seller.Major,
		PictureStudent: seller.PictureStudent,
		MemberID:       seller.MemberID,
	}

	// บันทึก
	if err := db.Create(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": s})
}

// GET /sellers/:id
func GetSeller(c *gin.Context) { //เข้าถึงข้อมูลผู้ขายตาม id
	ID := c.Param("id")
	var seller entity.Seller

	db := config.DB()
	result := db.Preload("Products").First(&seller, ID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, seller)
}

// PATCH /sellers/:id
func UpdateSeller(c *gin.Context) { //อัพเดตข้อมูลผู้ขายตาม id 
	var seller entity.Seller

	SellerID := c.Param("id")

	db := config.DB()
	result := db.First(&seller, SellerID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&seller); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&seller)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// DELETE /sellers/:id
func DeleteSeller(c *gin.Context) { 
	// ลบข้อมูลผู้ขายตาม id
	id := c.Param("id")
	db := config.DB()

	// ลบข้อมูล Product ที่เกี่ยวข้องกับ Seller
	var products []entity.Product
	if tx := db.Where("seller_id = ?", id).Delete(&products); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "products not found for this seller"})
		return
	}

	// ลบข้อมูล Seller
	if tx := db.Delete(&entity.Seller{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}


