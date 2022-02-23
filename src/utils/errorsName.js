const errorsName = [
	'ConflictAttributeError',
	'InexistentIdError',
	'SchemaError',
]

const isPersonalizedError = errorName => errorsName.includes(errorName)


export {
	isPersonalizedError,
}
