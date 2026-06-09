interface anyObj {
    [key: string]: any
}

type Writeable<T> = { -readonly [P in keyof T]: T[P] }
