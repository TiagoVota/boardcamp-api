class ConflictAttributeError extends Error {
	constructor({ value, atribute, table }) {
		super('ConflictAttributeError')
		this.name = 'ConflictAttributeError'
		this.message = `'${value}' ${atribute} already exists in '${table}'!`
		this.status = 409
	}
}


export default ConflictAttributeError
