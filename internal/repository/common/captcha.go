package common

import (
	"ai-go-mall/internal/model"
	"ai-go-mall/internal/repository"
)

// CaptchaRepository 验证码仓储
type CaptchaRepository struct {
	*repository.Repository[model.Captcha]
}

// NewCaptchaRepository 创建验证码仓储实例
func NewCaptchaRepository() *CaptchaRepository {
	return &CaptchaRepository{
		Repository: repository.NewRepository[model.Captcha](),
	}
}
