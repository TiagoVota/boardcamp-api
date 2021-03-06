import * as customerRepository from '../repositories/customerRepository.js'
import * as gameRepository from '../repositories/gameRepository.js'
import * as rentalRepository from '../repositories/rentalRepository.js'

import * as rentalSchema from '../schemas/rentalSchema.js'

import * as rentalHelper from '../helper/rentalHelper.js'

import { validationErrors } from '../validations/handleValidation.js'
import { formatDateISO } from '../utils/dayjs.service.js'
import { boolStrToBool } from '../utils/stringManipulator.js'

import InexistentIdError from '../errors/InexistentIdError.js'
import NoStockError from '../errors/NoStockError.js'
import RentalFinalizedError from '../errors/RentalFinalizedError.js'
import SchemaError from '../errors/SchemaError.js'


const listRentals = async (params) => {
	const {
		customerId,
		gameId,
		limit,
		offset,
		order,
		desc,
		status,
		startDate,
		endDate,
	} = params

	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: params,
		objectValidation: rentalSchema.rentalQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const rentals = await rentalRepository.findRentals({
		customerId,
		gameId,
		limit,
		offset,
		order,
		isDesc: boolStrToBool(desc),
		status,
		startDate,
		endDate,
	})

	const sanitizedRentals = rentalHelper.sanitizeRentals(rentals)

	return sanitizedRentals
}


const getMetrics = async ({ startDate, endDate }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { startDate, endDate },
		objectValidation: rentalSchema.rentalMetricsQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const metrics = await rentalRepository.findMetrics({ startDate, endDate })
	const { revenue, rentals } = metrics

	return {
		revenue: Number(revenue),
		rentals: Number(rentals),
		average: revenue / rentals || 0,
	}
}


const sendRental = async ({ rentalInfo }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: rentalInfo,
		objectValidation: rentalSchema.rentalSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	const { customerId, gameId, daysRented } = rentalInfo

	const existentCustomer = await customerRepository.findCustomerById({
		id: customerId
	})
	if (!existentCustomer) throw new InexistentIdError({
		id: customerId,
		table: 'customers'
	})
	
	const existentGame = await gameRepository.findGameById({
		id: gameId
	})
	if (!existentGame) throw new InexistentIdError({
		id: gameId,
		table: 'games'
	})
	const { stockTotal, name: gameName, pricePerDay } = existentGame

	const totalGameRentals = await rentalRepository.countGameRentals({ gameId })

	if (stockTotal <= totalGameRentals) throw new NoStockError({ name: gameName })

	const rental = await rentalRepository.insertRental({
		...rentalInfo,
		rentDate: formatDateISO(),
		returnDate: null,
		originalPrice: Number(daysRented) * Number(pricePerDay),
		delayFee: null,
	})

	return rental
}


const returnRental = async ({ rentalId }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { rentalId },
		objectValidation: rentalSchema.rentalIdSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const toUpdateRental = await rentalRepository.findRentalById({ id: rentalId })
	if (!toUpdateRental) throw new InexistentIdError({
		id: rentalId,
		table: 'rentals',
	})
	const { returnDate, rentDate, daysRented, originalPrice } = toUpdateRental

	const pricePerDay = Number(originalPrice) / Number(daysRented)

	if (returnDate !== null) throw new RentalFinalizedError({ id: rentalId })

	const rental = await rentalRepository.updateRental({
		id: rentalId,
		returnDate: formatDateISO(),
		delayFee: rentalHelper.calculateDelayFee(rentDate, daysRented, pricePerDay),
	})

	return rental
}


const removeRental = async ({ rentalId }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { rentalId },
		objectValidation: rentalSchema.rentalIdSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	
	const toDeleteRental = await rentalRepository.findRentalById({ id: rentalId })
	if (!toDeleteRental) throw new InexistentIdError({
		id: rentalId,
		table: 'rentals',
	})
	const { returnDate } = toDeleteRental

	if (returnDate !== null) throw new RentalFinalizedError({ id: rentalId })
	
	const rental = await rentalRepository.deleteRental({ id: rentalId })

	return rental
}


export {
	listRentals,
	getMetrics,
	sendRental,
	returnRental,
	removeRental,
}
