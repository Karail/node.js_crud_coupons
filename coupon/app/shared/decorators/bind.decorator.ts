// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Bind(_, _2, descriptor: PropertyDescriptor): PropertyDescriptor {
	const original = descriptor.value;
	return {
		configurable: true,
		enumerable: false,
		get() {
			return original.bind(this);
		}
	};
}