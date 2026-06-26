import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { LangKey } from '/@/lang'
import { CONFIG } from '/@/stores/constant/cacheKey'
import type { Lang, Layout } from '/@/stores/interface/config'

export const useConfig = defineStore(
    'config',
    () => {
        /**
         * 多语言相关配置
         */
        const lang: Lang = reactive({
            active: 'zh-cn',
            fallback: 'zh-cn',
        })

        /**
         * 布局配置
         */
        const layout: Layout = reactive({
            // 全局
            mode: 'Default',
            dark: false,
            shrink: false,
            showConfigDrawer: false,
            mainAnimation: 'slide-right',

            // 菜单栏
            menuBackground: ['#ffffff', '#1d1e1f'],
            menuColor: ['#303133', '#CFD3DC'],
            menuActiveBackground: ['#ffffff', '#1d1e1f'],
            menuActiveColor: ['#409eff', '#3375b9'],
            menuHoverBackground: ['#ecf5ff', '#18222c'],
            menuWidth: 260,
            menuDefaultIcon: 'fa fa-circle-o',
            menuCollapse: false,
            menuUniqueOpened: false,
            menuShowTopBar: true,
            menuTopBarBackground: ['#fcfcfc', '#1d1e1f'],
            menuTopBarColor: ['#409eff', '#3375b9'],
            menuTopBarCenter: false,
            menuTopBarLogo: false,
            menuToolBarAutoHide: false,
            menuToolBarColor: ['#303133', '#CFD3DC'],
            menuToolBarHoverColor: ['#409eff', '#CFD3DC'],
            menuToolBarHoverBackground: ['#ecf5ff', '#18222c'],

            // 主菜单栏额外配置项（一些布局存在主次两个菜单栏）
            menuBackgroundPrimary: ['#f5f5f5', '#18222c'],
            menuActiveBackgroundPrimary: ['#c6e2ff', '#1d1e1f'],

            // 左分布局独有菜单栏配置
            menuWidthLeftSplit: 180,
            menuHoverBackgroundLeftSplit: ['#ebebeb', '#213d5b'],

            // 顶栏
            headerBarTabColor: ['#000000', '#CFD3DC'],
            headerBarTabActiveColor: ['#000000', '#409EFF'],
            headerBarBackground: ['#ffffff', '#1d1e1f'],
            headerBarHoverBackground: ['#f5f5f5', '#18222c'],
            headerBarTabActiveBackground: ['#f5f5f5', '#141414'],
            headerBarTabActiveBackgroundFloating: ['#ffffff', '#1d1e1f'],

            // tour
            showTour: false,
            tourUnfinished: true,
        })

        /**
         * 设置激活语言
         */
        function setLang(value: LangKey) {
            lang.active = value
        }

        /**
         * 设置布局配置项
         */
        const setLayoutValue = (name: keyof Layout, value: any) => {
            ;(layout[name] as any) = value
        }

        const getColorValue = function (name: keyof Layout): string {
            const colors = layout[name] as string[]
            if (layout.dark) {
                return colors[1]
            } else {
                return colors[0]
            }
        }

        return { lang, layout, setLang, setLayoutValue, getColorValue }
    },
    {
        persist: {
            key: CONFIG,
        },
    }
)
