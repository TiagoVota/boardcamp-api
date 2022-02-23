class ConflictAttributeError extends Error {
	constructor({ name, type }) {
		super('ConflictAttributeError')
		this.name = 'ConflictAttributeError'
		this.message = `"${name}" already exists in "${type}"!`
		this.status = 409
	}
}


export default ConflictAttributeError
