interface anyObj {
    [key: string]: any
}

interface Window {
    loading: boolean
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] }
