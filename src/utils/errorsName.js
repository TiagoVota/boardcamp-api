const errorsName = [
	'SchemaError',
]

const isPersonalizedError = errorName => errorsName.includes(errorName)


export {
	isPersonalizedError,
}
