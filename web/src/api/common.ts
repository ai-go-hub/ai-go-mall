import type { ClickRequest } from '/@/components/clickCaptcha/index'
import request from '/@/utils/request'

export function getClickCaptcha(apiBaseURL?: string) {
    return request({
        url: '/common/captcha/create',
        method: 'GET',
        ...(apiBaseURL ? { baseURL: apiBaseURL } : {}),
    })
}

export function checkClickCaptcha(data: ClickRequest, apiBaseURL?: string) {
    return request({
        url: '/common/captcha/verify',
        method: 'POST',
        data,
        ...(apiBaseURL ? { baseURL: apiBaseURL } : {}),
        requestOptions: {
            showErrorMessage: false,
        },
    })
}
