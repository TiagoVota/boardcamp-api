import connection from '../database/database.js'
import * as queryStrHelper from '../helper/queryStrHelper.js'


const findCustomers = async ({ cpf, offset, limit }) => {
	const baseQueryStr = `
		SELECT
			*
		FROM
			customers
		WHERE
			cpf LIKE $1
	`
	const baseQueryArgs = [`${cpf}%`]

	const {	queryStr,	queryArgs } = queryStrHelper.makePaginationQueryStr(
		baseQueryStr,
		baseQueryArgs,
		offset,
		limit
	)

	const customersResult = await connection.query(queryStr, queryArgs)

	return customersResult.rows
}


const findCustomerById = async ({ id }) => {
	const queryStr = `
		SELECT
			*
		FROM
			customers
		WHERE
			id = $1;
	`
	const queryArgs = [id]

	const customerResult = await connection.query(queryStr, queryArgs)
	const customer = customerResult.rows[0]

	if (!customer) return null
	return customerResult.rows[0]
}


const findCustomerByCpf = async ({ cpf }) => {
	const queryStr = `
		SELECT
			*
		FROM
			customers
		WHERE
			cpf = $1;
	`
	const queryArgs = [cpf]

	const customerResult = await connection.query(queryStr, queryArgs)
	const customer = customerResult.rows[0]

	if (!customer) return null
	return customer
}


const insertCustomer = async (customerInfo) => {
	const { name, phone, cpf, birthday } = customerInfo
	const queryStr = `
		INSERT INTO customers
			(name, phone, cpf, birthday)
		VALUES
			($1, $2, $3, $4)
		RETURNING
			*;
	`
	const queryArgs = [name, phone, cpf, birthday]

	const customerResult = await connection.query(queryStr, queryArgs)

	return customerResult.rows[0]
}


const updateCustomer = async (customerInfo) => {
	const { name, phone, cpf, birthday, id } = customerInfo
	const queryStr = `
		UPDATE
			customers
		SET
			name = $1, 
			phone = $2, 
			cpf = $3, 
			birthday = $4
		WHERE
			id = $5
		RETURNING
			*;
	`
	const queryArgs = [name, phone, cpf, birthday, id]

	const customerResult = await connection.query(queryStr, queryArgs)

	return customerResult.rows[0]
}


export {
	findCustomers,
	findCustomerById,
	findCustomerByCpf,
	insertCustomer,
	updateCustomer,
}
