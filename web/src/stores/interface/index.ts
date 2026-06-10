import { LangKey } from '/@/lang/index'

export interface AdminInfo {
    id: number
    username: string
    nickname: string
    avatar: string
    last_login_at: string
    last_login_ip: string
    token: string
    // 是否是 superAdmin（用于判定是否显示超管级按钮，不做任何权限判断）
    super: boolean
}

export interface Lang {
    // 激活语言
    active: LangKey
    // 备用语言
    fallback: LangKey
}
