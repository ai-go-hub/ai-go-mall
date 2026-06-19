package random

import (
	"crypto/rand"
	"image/color"
	"math/big"
	mathrand "math/rand/v2"
)

// Int 返回 [min, max) 范围的加密安全随机整数
// 可用 Int(100, 999) 生成 3 位随机数，以此类推
func Int(min, max int) int {
	if max <= min {
		return min
	}
	n, err := rand.Int(rand.Reader, big.NewInt(int64(max-min)))
	if err != nil {
		return min
	}
	return min + int(n.Int64())
}

// FastInt 返回 [min, max) 范围的快速随机整数
// 可用 FastInt(100, 999) 生成 3 位随机数，以此类推
func FastInt(min, max int) int {
	if max <= min {
		return min
	}
	return min + mathrand.IntN(max-min)
}

// RGB 返回随机 RGB 颜色
// tone:light=浅色,dark=深色
func RGB(tone string) color.Color {
	if tone == "light" {
		return color.RGBA{
			R: uint8(180 + Int(0, 75)),
			G: uint8(180 + Int(0, 75)),
			B: uint8(180 + Int(0, 75)),
			A: 255,
		}
	}
	return color.RGBA{
		R: uint8(20 + Int(0, 80)),
		G: uint8(20 + Int(0, 80)),
		B: uint8(20 + Int(0, 80)),
		A: 255,
	}
}
