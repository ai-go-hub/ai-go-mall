package common

import (
	handlerCommon "ai-go-mall/internal/handler/common"
	repoCommon "ai-go-mall/internal/repository/common"
	"ai-go-mall/internal/router/registry"
	svcCommon "ai-go-mall/internal/service/common"

	"github.com/gin-gonic/gin"
)

func init() {
	registry.Register(func(r *gin.Engine) {
		repo := repoCommon.NewCaptchaRepository()
		svc := svcCommon.NewCaptchaService(repo)
		h := handlerCommon.NewCaptchaHandler(svc)

		group := r.Group("/common/captcha")
		h.RegisterRoutes(group)
	})
}
