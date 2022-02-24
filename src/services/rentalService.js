import * as rentalRepository from '../repositories/rentalRepository.js'

import * as rentalSchema from '../schemas/rentalSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

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
}
