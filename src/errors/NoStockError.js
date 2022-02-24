class NoStockError extends Error {
	constructor({ name }) {
		super('NoStockError')
		this.name = 'NoStockError'
		this.message = `Stock for the game '${name}' is already 0!`
		this.status = 409
	}
}


export default NoStockError
