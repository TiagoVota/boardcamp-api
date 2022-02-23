class ConflictAtributeError extends Error {
	constructor({ name, type }) {
		super('ConflictAtributeError')
		this.name = 'ConflictAtributeError'
		this.message = `"${name}" already exists in "${type}"!`
		this.status = 409
	}
}


export default ConflictAtributeError
