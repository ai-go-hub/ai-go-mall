/**
 * 生成 v4 UUID
 * @returns uuid
 */
export function uuid(): string {
    const chars: string[] = new Array(36)
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            chars[i] = '-'
        } else if (i === 14) {
            chars[i] = '4' // UUID v4 版本位
        } else if (i === 19) {
            chars[i] = ((Math.random() * 4) | 8).toString(16) // 变体位
        } else {
            chars[i] = ((Math.random() * 16) | 0).toString(16)
        }
    }
    return chars.join('')
}
