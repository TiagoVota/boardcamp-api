import * as rentalService from '../services/rentalService.js'


const getRentals = async (req, res, next) => {
	const { query: { customerId, gameId, limit, offset } } = req

	try {
		const rentals = await rentalService.listRentals({
			customerId,
			gameId,
			limit,
			offset,
		})
		
		return res.status(200).send(rentals)

	} catch (error) {		
		next(error)
	}
}


const getRentalMetrics = async (req, res, next) => {
	const { query: { startDate, endDate } } = req
	
	try {
		const metrics = await rentalService.getMetrics({ startDate, endDate })
		
		return res.status(200).send(metrics)

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


const deleteRental = async (req, res, next) => {
	const { params: { rentalId } } = req
	try {
		const rental = await rentalService.removeRental({ rentalId })
		
		return res.status(200).send(rental)

	} catch (error) {		
		next(error)
	}
}


export {
	getRentals,
	getRentalMetrics,
	postRental,
	postReturnRental,
	deleteRental,
}
