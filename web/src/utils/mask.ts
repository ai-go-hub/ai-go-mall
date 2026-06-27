import { useEventListener } from '@vueuse/core'

export const maskElementClass = 'ai-go-mask'

/*
 * 显示页面遮罩
 */
export const showMask = function (className = 'mask', closeCallBack: Function): void {
    const container = document.querySelector('.layout-container') as HTMLElement
    const maskDiv = document.createElement('div')
    maskDiv.setAttribute('class', `${maskElementClass} ${className}`)
    container.appendChild(maskDiv)
    useEventListener(maskDiv, 'click', () => closeMask(closeCallBack))
}

/*
 * 隐藏页面遮罩
 */
export const closeMask = function (closeCallBack: Function = () => {}): void {
    const shadeEl = document.querySelector(`.${maskElementClass}`) as HTMLElement
    shadeEl && shadeEl.remove()

    closeCallBack()
}
