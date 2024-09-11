package config

import (
	"fmt"

	"github.com/sa-67-song_thor_sut/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("db_song_thor_sut.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	
	db.AutoMigrate(
		&entity.Product{},
	    &entity.Seller{},
	    &entity.Order{},
	    &entity.Member{},
	    &entity.Products_order{},
	    &entity.Order{},
	)

	User := &entity.Member{
		Username:  "B6526221",
	    Password:  "gam101046", 
	    Email:     "gam101046gam@gmail.com",
	    FirstName: "Natthawut",
		LastName:  "Samruamjit",
		PhoneNumber: "0910164350",
		Address:   "4/4 นครพนม 48120",
		ProfilePic: "",

	}
	db.FirstOrCreate(User, &entity.Member{
		Email: "gam101046gam@gmail.com",
	})

}