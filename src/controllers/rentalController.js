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


const postRental = async (req, res, next) => {
	const { body: rentalInfo } = req

	try {
		const rental = await rentalService.sendRental({ rentalInfo })
		
		return res.status(201).send(rental)

	} catch (error) {		
		next(error)
	}
}


const postReturnRental = async (req, res, next) => {
	const { params: { rentalId } } = req

	try {
		const rental = await rentalService.returnRental({ rentalId })
		
		return res.status(200).send(rental)

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
	postRental,
	postReturnRental,
}