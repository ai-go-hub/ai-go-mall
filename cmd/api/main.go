package main

import (
	"fmt"
	"log"
	"net/http"

	"ai-go-mall/config"
	"ai-go-mall/internal/database"

	"github.com/gin-gonic/gin"
)

func main() {
	if err := config.Init(); err != nil {
		log.Fatalf("config init: %v", err)
	}

	if err := database.Init(); err != nil {
		log.Fatalf("database init: %v", err)
	}

	cfg := config.Get()

	r := gin.Default()

	// 注册数据库中间件
	r.Use(database.Middleware())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	addr := fmt.Sprintf(":%d", cfg.Server.Port)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server start: %v", err)
	}
}
