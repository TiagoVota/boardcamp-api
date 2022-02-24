class InexistentIdError extends Error {
	constructor({ id, table }) {
		super('InexistentIdError')
		this.name = 'InexistentIdError'
		this.message = `'${id}' id no exists in '${table}'!`
		this.status = 404
	}
}


export default InexistentIdError
