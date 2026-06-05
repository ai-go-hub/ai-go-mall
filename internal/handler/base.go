package handler

import (
	"strconv"

	"ai-go-mall/internal/response"
	"ai-go-mall/internal/service"

	"github.com/gin-gonic/gin"
)

// Handler 通用控制器
type Handler[T any] struct {
	svc service.IService[T]
}

// NewHandler 创建通用控制器实例
func NewHandler[T any](svc service.IService[T]) *Handler[T] {
	return &Handler[T]{svc: svc}
}

// RegisterBaseRoutes 注册基控制器的通用 CRUD 路由
// 只使用 GET、POST，不使用 PUT、DELETE 等请求方式（除 GET/POST 外的请求方式，在国内的 CDN/全站加速 等场景兼容性极差）
func (h *Handler[T]) RegisterBaseRoutes(group *gin.RouterGroup) {
	group.POST("/create", h.Create)
	group.GET("/rows", h.Rows)
	group.GET("/row/:id", h.Row)
	group.POST("/update/:id", h.Update)
	group.POST("/delete/:id", h.Delete)
}

// Create 新增记录
func (h *Handler[T]) Create(c *gin.Context) {
	var entity T
	if err := c.ShouldBindJSON(&entity); err != nil {
		response.Fail(c, response.WithMessage("参数错误: "+err.Error()))
		return
	}

	if err := h.svc.Create(c, &entity); err != nil {
		response.Fail(c, response.WithMessage("创建失败: "+err.Error()))
		return
	}

	response.Success(c)
}

// Rows 获取列表
func (h *Handler[T]) Rows(c *gin.Context) {
	entities, err := h.svc.Rows(c)
	if err != nil {
		response.Fail(c, response.WithMessage("查询失败: "+err.Error()))
		return
	}

	response.Success(c, response.WithData(entities))
}

// Row 获取单条记录
func (h *Handler[T]) Row(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.Fail(c, response.WithMessage("无效的 ID"))
		return
	}

	entity, err := h.svc.Row(c, uint(id))
	if err != nil {
		response.Fail(c, response.WithMessage("记录不存在"))
		return
	}

	response.Success(c, response.WithData(entity))
}

// Update 更新记录
func (h *Handler[T]) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.Fail(c, response.WithMessage("无效的 ID"))
		return
	}

	var entity T
	if err := c.ShouldBindJSON(&entity); err != nil {
		response.Fail(c, response.WithMessage("参数错误: "+err.Error()))
		return
	}

	if err := h.svc.Update(c, uint(id), entity); err != nil {
		response.Fail(c, response.WithMessage("更新失败: "+err.Error()))
		return
	}

	response.Success(c)
}

// Delete 删除记录
func (h *Handler[T]) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.Fail(c, response.WithMessage("无效的 ID"))
		return
	}

	if err := h.svc.Delete(c, uint(id)); err != nil {
		response.Fail(c, response.WithMessage("删除失败: "+err.Error()))
		return
	}

	response.Success(c)
}
