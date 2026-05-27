package main

import (
	"fmt"
	"log"

	"ai-go-mall/config"
)

func main() {
	// 初始化配置
	if err := config.Init(); err != nil {
		log.Fatalf("config init: %v", err)
	}

	cfg := config.Get()

	fmt.Printf("应用名称: %s\n", cfg.App.Name)
	fmt.Printf("服务端口: %d\n", cfg.Server.Port)
	fmt.Printf("数据库类型: %s\n", cfg.Database.Type)
	fmt.Printf("数据库地址: %s:%d\n", cfg.Database.Host, cfg.Database.Port)
	fmt.Printf("数据库名称: %s\n", cfg.Database.DBName)
	fmt.Printf("连接池配置: max_open=%d max_idle=%d max_lifetime=%d\n",
		cfg.Database.MaxOpenConns,
		cfg.Database.MaxIdleConns,
		cfg.Database.ConnMaxLifetime,
	)
}
