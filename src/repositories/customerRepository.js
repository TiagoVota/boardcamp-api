import * as queryStrHelper from '../helper/queryStrHelper.js'

import connection from '../database/database.js'


const findCustomers = async ({ cpf, offset, limit, order, isDesc }) => {
	const orderByFilters = {
		id: 1,
		name: 2,
		phone: 3,
		cpf: 4,
		birthday: 5,
		rentalsCount: 6,
	}
	
	const baseQueryStr = `
		SELECT
			c.*,
			COUNT(r.id) AS "rentalsCount"
		FROM
			customers AS c
		LEFT JOIN
			rentals AS r
		ON 
			c.id = r."customerId"
		WHERE
			cpf LIKE $1
		GROUP BY
			c.id
		${queryStrHelper.makeOrderByQuery(order, orderByFilters, isDesc)}
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
