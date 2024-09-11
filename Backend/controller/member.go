package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sa-67-song_thor_sut/config"
	"github.com/sa-67-song_thor_sut/entity"
)

// CreateMember สร้างข้อมูลสมาชิกใหม่
func CreateMember(c *gin.Context) {
	var member entity.Member


	if err := c.ShouldBindJSON(&member); err != nil { 	// ตรวจสอบการเชื่อมโยง JSON payload กับ struct Member
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})  // ส่งกลับข้อผิดพลาดหากการเชื่อมโยงไม่สำเร็จ
		return
	}

	db := config.DB()	// เชื่อมต่อกับฐานข้อมูล

	
	hashedPassword, err := config.HashPassword(member.Password) // เข้ารหัสรหัสผ่าน
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"}) // ส่งกลับข้อผิดพลาดหากการเข้ารหัสไม่สำเร็จ
		return
	}

	// สร้าง object ของ Member ใหม่ที่มีรหัสผ่านที่ถูกเข้ารหัส
	m := entity.Member{
		Username:    member.Username,
		Password:    hashedPassword,
		Email:       member.Email,
		FirstName:   member.FirstName,
		LastName:    member.LastName,
		PhoneNumber: member.PhoneNumber,
		Address:     member.Address,
		ProfilePic:  member.ProfilePic,
	}

	
	if err := db.Create(&m).Error; err != nil { // บันทึกข้อมูลสมาชิกลงในฐานข้อมูล
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	
	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": m}) // ส่งกลับข้อความว่าสร้างสมาชิกสำเร็จพร้อมข้อมูลที่สร้าง
}

// GetMember ดึงข้อมูลสมาชิกตาม ID
func GetMember(c *gin.Context) {
	ID := c.Param("id") // รับค่า ID จากพารามิเตอร์ของ URL
	var member entity.Member

	db := config.DB()

	
	result := db.Preload("Orders").Preload("Sellers").First(&member, ID) // ค้นหาข้อมูลสมาชิกพร้อม preload ข้อมูล Orders และ Sellers ที่เกี่ยวข้อง
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, member)
}

// ListMembers ดึงข้อมูลสมาชิกทั้งหมด
func ListMembers(c *gin.Context) {
	var members []entity.Member
	db := config.DB()

	result := db.Preload("Orders").Preload("Sellers").Find(&members) // ดึงข้อมูลสมาชิกทั้งหมดพร้อม preload ข้อมูล Orders และ Sellers ที่เกี่ยวข้อง
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve members"})
		return
	}

	c.JSON(http.StatusOK, members)
}

// DeleteMember ลบข้อมูลสมาชิกตาม ID
func DeleteMember(c *gin.Context) {
	id := c.Param("id") // รับค่า ID จากพารามิเตอร์ของ URL
	db := config.DB()   // เชื่อมต่อกับฐานข้อมูล

	// เริ่มต้นการทำธุรกรรม (transaction)
	tx := db.Begin()

	// ลบข้อมูล Seller ที่เกี่ยวข้องกับ Member
	var seller entity.Seller
	if tx.Where("member_id = ?", id).Delete(&seller).RowsAffected > 0 {
		// หากพบ Seller ที่เกี่ยวข้อง
	}

	// ลบข้อมูล Order ที่เกี่ยวข้องกับ Member
	var orders []entity.Order
	if tx.Where("member_id = ?", id).Delete(&orders).RowsAffected > 0 {
		// หากพบ Orders ที่เกี่ยวข้อง
	}

	// ลบข้อมูล Member
	if tx.Delete(&entity.Member{}, id).RowsAffected > 0 {
		// หากลบ Member สำเร็จ
		tx.Commit() // ยืนยันการทำธุรกรรม
		c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
	} else {
		tx.Rollback() // ยกเลิกการทำธุรกรรม
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
	}
}

// UpdateMember อัพเดทข้อมูลสมาชิกตาม ID
func UpdateMember(c *gin.Context) {
	var member entity.Member

	MemberID := c.Param("id") // รับค่า ID จากพารามิเตอร์ของ URL

	db := config.DB()
	result := db.First(&member, MemberID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	
	if err := c.ShouldBindJSON(&member); err != nil {  // ตรวจสอบการเชื่อมโยง JSON payload กับ struct Member

		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	
	if err := db.Model(&member).Updates(member).Error; err != nil { // อัพเดทข้อมูลสมาชิกในฐานข้อมูล

		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update member"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
