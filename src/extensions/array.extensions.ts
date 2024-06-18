interface Array<T> {
    last(): T
    random(): T
}

Array.prototype.last = function <T>(): T {
    return this[this.length - 1]
}

Array.prototype.random = function <T>(): T {
    return this[~~(Math.random() * this.length)]
}