import * as customerRepository from '../repositories/customerRepository.js'
import * as customerSchema from '../schemas/customerSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import SchemaError from '../errors/SchemaError.js'


const listCustomers = async ({ cpf }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { cpf },
		objectValidation: customerSchema.customerQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const customers = await customerRepository.findCustomers({ cpf })

	return customers
}


// const serviceFunction = async (customerInfo) => {
// 	const customerErrors = validationErrors({
// 		objectToValid: customerInfo,
// 		objectValidation: customerSchema.customerSchema
// 	})

// 	if (customerErrors) throw new SchemaError(customerErrors)

// 	const result = await customerRepository.repositoryFunction(customerInfo)

// 	return result
// }


export {
	listCustomers,
}
