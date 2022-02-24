import * as rentalService from '../services/rentalService.js'


const getRentals = async (req, res, next) => {
	const { query: { customerId, gameId } } = req

	try {
		const rentals = await rentalService.listRentals({ customerId, gameId })
		
		return res.status(200).send(rentals)

	} catch (error) {		
		next(error)
	}
}


const controllerFunction = async (req, res, next) => {
	const { body: rentalInfo } = req

	try {
		const rentals = await rentalService.serviceFunction(rentalInfo)
		
		return res.status(201).send(rentals)

	} catch (error) {		
		next(error)
	}
}


export {
	getRentals,
}
