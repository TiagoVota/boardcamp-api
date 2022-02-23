import * as customerService from '../services/customerService.js'


const getCustomers = async (req, res, next) => {
	const { query: { cpf } } = req

	try {
		const customers = await customerService.listCustomers({ cpf })
		
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


// const getCustomers = async (req, res, next) => {
// 	const { body: customerInfo } = req

// 	try {
// 		const result = await customerService.serviceFunction(customerInfo)
		
// 		return res.status(201).send(result)

// 	} catch (error) {		
// 		next(error)
// 	}
// }


export {
	getCustomers,
	getCustomer,
	postCustomer,
}
