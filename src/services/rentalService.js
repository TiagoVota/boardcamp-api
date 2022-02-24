import * as customerRepository from '../repositories/customerRepository.js'
import * as gameRepository from '../repositories/gameRepository.js'
import * as rentalRepository from '../repositories/rentalRepository.js'

import * as rentalSchema from '../schemas/rentalSchema.js'

import { validationErrors } from '../validations/handleValidation.js'
import { formatDateISO } from '../utils/dayjs.service.js'

import InexistentIdError from '../errors/InexistentIdError.js'
import NoStockError from '../errors/NoStockError.js'
import SchemaError from '../errors/SchemaError.js'


const listRentals = async ({ customerId, gameId }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { customerId, gameId },
		objectValidation: rentalSchema.rentalQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const rentals = await rentalRepository.findRentals({ customerId, gameId })

	return rentals
}


const sendRentals = async ({ rentalInfo }) => {
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
	console.log({ total: Number(daysRented) * Number(pricePerDay) })

	const totalGameRentals = await rentalRepository.countGameRentals({ gameId })

	if (stockTotal <= totalGameRentals) throw new NoStockError({ name: gameName })

	const rental = await rentalRepository.insertRental({
		...rentalInfo,
		rentDate: formatDateISO(new Date()),
		returnDate: null,
		originalPrice: Number(daysRented) * Number(pricePerDay),
		delayFee: null,
	})

	return rental
}


const serviceFunction = async (rentalInfo) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: rentalInfo,
		objectValidation: rentalSchema.rentalSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const result = await rentalRepository.repositoryFunction(rentalInfo)

	return result
}


export {
	listRentals,
	sendRentals,
}
