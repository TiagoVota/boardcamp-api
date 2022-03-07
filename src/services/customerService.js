import * as customerRepository from '../repositories/customerRepository.js'

import * as customerSchema from '../schemas/customerSchema.js'

import * as customerHelper from '../helper/customerHelper.js'

import { validationErrors } from '../validations/handleValidation.js'

import ConflictAttributeError from '../errors/ConflictAttributeError.js'
import InexistentIdError from '../errors/InexistentIdError.js'
import SchemaError from '../errors/SchemaError.js'


const listCustomers = async ({ cpf, limit, offset, order, desc }) => {
	const { isValidSchema, schemaErrorMsg } = validationErrors({
		objectToValid: { cpf, limit, offset, order, desc },
		objectValidation: customerSchema.customerQuerySchema
	})
	
	if (!isValidSchema) throw new SchemaError(schemaErrorMsg)

	const customers = await customerRepository.findCustomers({
		cpf: cpf || '',
		limit,
		offset,
		order,
		desc: desc?.toLowerCase() === 'true' || false,
	})

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
		table: 'customers',
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


const changeCustomer = async ({ customerInfo, customerId }) => {
	const {
		isValidSchema: isValidCustomer,
		schemaErrorMsg: customerErros
	} = validationErrors({
		objectToValid: customerInfo,
		objectValidation: customerSchema.customerSchema
	})

	if (!isValidCustomer) throw new SchemaError(customerErros)

	const {
		isValidSchema: isValidId,
		schemaErrorMsg: IdErros
	} = validationErrors({
		objectToValid: { customerId },
		objectValidation: customerSchema.customerIdSchema
	})
	
	if (!isValidId) throw new SchemaError(IdErros)

	const { cpf } = customerInfo

	const toUpdateCustomer = await customerRepository.findCustomerById({
		id: customerId
	})
	if (!toUpdateCustomer) throw new InexistentIdError({
		id: customerId,
		table: 'customers'
	})
	
	const existentCustomer = await customerRepository.findCustomerByCpf({ cpf })
	
	const isValidUpdate = customerHelper.validateUpdate(
		customerId,
		existentCustomer
	)

	if (!isValidUpdate) throw new ConflictAttributeError({
		value: cpf,
		atribute: 'cpf',
		table: 'customers',
	})

	const customer = await customerRepository.updateCustomer({
		...customerInfo,
		id: customerId
	})

	return customer
}


export {
	listCustomers,
	takeCustomer,
	sendCustomer,
	changeCustomer,
}
