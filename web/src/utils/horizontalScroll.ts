/**
 * 横向滚动条操作优化
 * 可让鼠标滑轮直接滚动横向滚动条而无需按下 Shift 键
 * 不建议在同时支持纵向滚动的元素上使用
 */
export default class horizontalScroll {
    private el: HTMLElement

    constructor(nativeElement: HTMLElement) {
        this.el = nativeElement
        this.handleWheelEvent()
    }

    handleWheelEvent() {
        let wheel = ''

        if ('onmousewheel' in this.el) {
            wheel = 'mousewheel'
        } else if ('onwheel' in this.el) {
            wheel = 'wheel'
        } else if ('attachEvent' in window) {
            wheel = 'onmousewheel'
        } else {
            wheel = 'DOMMouseScroll'
        }
        this.el['addEventListener'](wheel, this.scroll, { passive: true })
    }

    scroll = (event: any) => {
        if (this.el.clientWidth >= this.el.scrollWidth) {
            return
        }
        this.el.scrollLeft += event.deltaY ? event.deltaY : event.detail && event.detail !== 0 ? event.detail : -event.wheelDelta
    }
}
