class InexistentIdError extends Error {
	constructor({ id, type }) {
		super('InexistentIdError')
		this.name = 'InexistentIdError'
		this.message = `"${id}" id no exists in "${type}"!`
		this.status = 404
	}
}


export default InexistentIdError
