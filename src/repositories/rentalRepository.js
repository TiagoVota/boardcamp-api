import connection from '../database/database.js'


const findRentals = async ({ customerId, gameId }) => {
	let queryStr = `
		SELECT
			*
		FROM
			rentals;
	`

	const rentalsResult = await connection.query(queryStr)

	return rentalsResult.rows
}


export {
	findRentals,
}
