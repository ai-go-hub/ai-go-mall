package common

import (
	"ai-go-mall/internal/infra/captcha"
	repoCommon "ai-go-mall/internal/repository/common"
)

// CaptchaService 验证码服务
type CaptchaService struct {
	repo *repoCommon.CaptchaRepository
}

// NewCaptchaService 创建验证码服务实例
func NewCaptchaService(repo *repoCommon.CaptchaRepository) *CaptchaService {
	return &CaptchaService{repo: repo}
}

// Create 创建点选验证码
func (s *CaptchaService) Create() (*captcha.ClickResult, error) {
	return captcha.Create()
}

// Verify 校验点选验证码
func (s *CaptchaService) Verify(req captcha.ClickRequest) (bool, error) {
	return captcha.Check(req, false)
}
