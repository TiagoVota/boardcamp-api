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


export {
	findCustomers,
}
