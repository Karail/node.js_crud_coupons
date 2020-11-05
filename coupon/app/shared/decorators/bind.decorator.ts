export function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
    const original = descriptor.value
    return {
        configurable: true,
        enumerable: false,
        get() {
            return original.bind(this)
        }
    }
}