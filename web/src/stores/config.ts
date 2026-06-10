import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { LangKey } from '/@/lang'
import { CONFIG } from '/@/stores/constant/cacheKey'
import type { Lang } from '/@/stores/interface'

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
         * 设置激活语言
         */
        function setLang(value: LangKey) {
            lang.active = value
        }

        return { lang, setLang }
    },
    {
        persist: {
            key: CONFIG,
        },
    }
)
