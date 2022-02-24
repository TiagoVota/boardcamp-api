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


const countGameRentals = async ({ gameId }) => {
	const queryStr = `
		SELECT
			COUNT(id) AS total
		FROM
			rentals
		WHERE
			"gameId" = $1;
	`
	const queryArgs = [gameId]
	const gameResult = await connection.query(queryStr, queryArgs)

	return gameResult.rows[0].total
}


const insertRental = async (rentalInfo) => {
	const {
		customerId,
		gameId,
		rentDate,
		daysRented,
		returnDate,
		originalPrice,
		delayFee,
	} = rentalInfo

	const queryStr = `
		INSERT INTO rentals
			(
				"customerId",
				"gameId",
				"rentDate",
				"daysRented",
				"returnDate",
				"originalPrice",
				"delayFee"
			)
		VALUES
			($1, $2, $3, $4, $5, $6, $7)
		RETURNING
			*;
	`
	const queryArgs = [
		customerId,
		gameId,
		rentDate,
		daysRented,
		returnDate,
		originalPrice,
		delayFee
	]
	const gameResult = await connection.query(queryStr, queryArgs)

	return gameResult.rows[0]
}


export {
	findRentals,
	countGameRentals,
	insertRental,
}
