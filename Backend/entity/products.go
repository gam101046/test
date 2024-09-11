package entity

import (
	"gorm.io/gorm"
)

type Product struct {
   gorm.Model
   Title           string
   Description     string
   Price           uint
   Category        string
   Picture_product string `gorm:"type:longtext"`
   Condition       string
   Weight          float32
   Status          string
   SellerID        *uint
   Seller          Seller          `gorm:"foreignKey:SellerID"`
   Product_Orders  []Products_order `gorm:"foreignKey:ProductID"`
}
