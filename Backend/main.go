package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sa-67-song_thor_sut/config"
	"github.com/sa-67-song_thor_sut/controller"
)

const PORT = "8000"

func main() {
	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	router := r.Group("")
	{
		router.GET("/member", controller.ListMembers)
		router.POST("/member", controller.CreateMember)
		router.PATCH("/member/:id", controller.UpdateMember)
		router.DELETE("/member/:id", controller.DeleteMember)


		router.POST("/sellers", controller.CreateSeller)
        router.GET("/sellers/:id", controller.GetSeller)
        router.DELETE("/sellers/:id", controller.DeleteSeller)

		router.POST("/orders", controller.CreateOrder)
        router.GET("/orders/:id", controller.GetOrder)
		router.GET("/orders", controller.ListOrders)
        router.PATCH("/orders/:id", controller.UpdateOrder)
        router.DELETE("/orders/:id", controller.DeleteOrder)
		router.GET("/orders/member/:memberId", controller.GetOrdersByMemberID)
		router.GET("/orders/member/:memberId/product/:productId", controller.GetOrdersByProductIDAndMemberID)
		router.GET("/orders/seller/:sellerId/product/:productId", controller.GetOrdersByProductIDAndSellerID)


		router.POST("/products", controller.CreateProduct)
        router.GET("/products/:id", controller.GetProduct)
		router.GET("/products", controller.ListProducts)
        router.DELETE("/products/:id", controller.DeleteProduct)
		router.GET("/products_by_member/:member_id", controller.GetProductsByMemberID)
		router.GET("/products/seller/:seller_id", controller.GetProductsBySellerID)


		router.POST("/products_orders", controller.CreateProductsOrder)
		router.GET("/products_orders", controller.ListProductsOrders)
        router.DELETE("/products_orders/:id", controller.DeleteProductsOrder)
		router.GET("/products_orders/:order_id", controller.GetProductsOrdersByOrderID)



	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
