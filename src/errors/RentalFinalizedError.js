class RentalFinalizedError extends Error {
	constructor({ id }) {
		super('RentalFinalizedError')
		this.name = 'RentalFinalizedError'
		this.message = `'${id}' id rental already finalized!`
		this.status = 409
	}
}


export default RentalFinalizedError
