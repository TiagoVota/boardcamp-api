import connection from '../database/database.js'


const findCustomers = async ({ cpf }) => {
	const queryStr = `
		SELECT
			*
		FROM
			customers
		WHERE
			cpf LIKE $1;
	`
	const queryArgs = [`${cpf}%`]

	const gamesPromise = await connection.query(queryStr, queryArgs)

	return gamesPromise.rows
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

	const gamePromise = await connection.query(queryStr, queryArgs)
	const game = gamePromise.rows[0]

	if (!game) return null
	return game
}


export {
	findCustomers,
	findCustomerById,
}
