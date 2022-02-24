const errorsName = [
	'ConflictAttributeError',
	'InexistentIdError',
	'NoStockError',
	'RentalFinalizedError',
	'SchemaError',
]

const isPersonalizedError = errorName => errorsName.includes(errorName)


export {
	isPersonalizedError,
}
