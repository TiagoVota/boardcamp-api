import * as customerRepository from '../repositories/customerRepository.js'

import * as customerSchema from '../schemas/customerSchema.js'

import { validationErrors } from '../validations/handleValidation.js'

import ConflictAttributeError from '../errors/ConflictAttributeError.js'
import InexistentIdError from '../errors/InexistentIdError.js'
import SchemaError from '../errors/SchemaError.js'


const listCustomers = async ({ cpf }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { cpf },
		objectValidation: customerSchema.customerQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const customers = await customerRepository.findCustomers({ cpf: cpf || '' })

	return customers
}


const takeCustomer = async ({ customerId }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { customerId },
		objectValidation: customerSchema.customerIdSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const customer = await customerRepository.findCustomerById({ id: customerId })
	if (customer === null) throw new InexistentIdError({
		id: customerId,
		type: 'customer',
	})

	return customer
}


const sendCustomer = async ({ customerInfo }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: customerInfo,
		objectValidation: customerSchema.customerSchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)
	const { cpf } = customerInfo

	const existentCustomer = await customerRepository.findCustomerByCpf({ cpf })
	if (existentCustomer) throw new ConflictAttributeError({
		value: cpf,
		atribute: 'cpf',
		table: 'customers',
	})

	const customer = await customerRepository.insertCustomer(customerInfo)

	return customer
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
	takeCustomer,
	sendCustomer,
}
