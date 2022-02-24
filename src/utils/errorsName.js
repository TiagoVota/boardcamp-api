const errorsName = [
	'ConflictAttributeError',
	'InexistentIdError',
	'NoStockError',
	'SchemaError',
]

const isPersonalizedError = errorName => errorsName.includes(errorName)


export {
	isPersonalizedError,
}
