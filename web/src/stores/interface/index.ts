import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export interface AdminInfo {
    id: number
    username: string
    nickname: string
    avatar: string
    lastLoginAt: string
    lastLoginIp: string
    token: string
    // 是否是 superAdmin（用于判定是否显示超管级按钮，不做任何权限判断）
    super: boolean
}

export interface Menu {
    // 从 API 加载到的原始菜单数据
    rawData: RouteRecordRaw[]
    // 次级菜单数据（一些布局模式会有两个菜单栏，可在此记录次级菜单栏的数据）
    children: RouteRecordRaw[]
    // 权限节点
    authNode: Map<string, string[]>
}

export interface NavTab {
    // tab 列表
    list: RouteLocationNormalized[]
    // 激活 tab 的 index
    activeIndex: number
    // 激活的 tab
    activeRoute: RouteLocationNormalized | null
    // 激活的 tab 是否全屏
    activeFullScreen: boolean
}
