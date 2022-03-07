import * as customerService from '../services/customerService.js'


const getCustomers = async (req, res, next) => {
	const { query: { cpf, limit, offset, order, desc } } = req

	try {
		const customers = await customerService.listCustomers({
			cpf,
			limit,
			offset,
			order,
			desc,
		})
		
		return res.status(200).send(customers)

	} catch (error) {		
		next(error)
	}
}


const getCustomer = async (req, res, next) => {
	const { params: { customerId } } = req

	try {
		const customer = await customerService.takeCustomer({ customerId })
		
		return res.status(200).send(customer)

	} catch (error) {		
		next(error)
	}
}

const postCustomer = async (req, res, next) => {
	const { body: customerInfo } = req

	try {
		const customer = await customerService.sendCustomer({ customerInfo })
		
		return res.status(201).send(customer)

	} catch (error) {		
		next(error)
	}
}


const editCustomer = async (req, res, next) => {
	const {
		body: customerInfo,
		params: { customerId }
	} = req

	try {
		const customer = await customerService
			.changeCustomer({ customerInfo, customerId })
		
		return res.status(200).send(customer)

	} catch (error) {		
		next(error)
	}
}


export {
	getCustomers,
	getCustomer,
	postCustomer,
	editCustomer,
}
