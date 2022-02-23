import connection from '../database/database.js'


const findGames = async ({ name }) => {
	const queryStr = `
		SELECT
			*
		FROM
			games
		WHERE
			name ILIKE $1;
	`
	const queryArgs = [`${name}%`]

	const gamesPromise = await connection.query(queryStr, queryArgs)

	return gamesPromise.rows
}


const findGameByName = async ({ name }) => {
	const queryStr = `
		SELECT
			*
		FROM
			games
		WHERE name = $1;
	`
	const queryArgs = [name]
	const gamePromise = await connection.query(queryStr, queryArgs)
	
	const game = gamePromise.rows[0]

	if (!game) return null
	return game
}


const insertGame = async (gameInfo) => {
	const { name, image, stockTotal, categoryId, pricePerDay } = gameInfo

	const queryStr = `
		INSERT INTO games
			(name, image, "stockTotal", "categoryId", "pricePerDay")
		VALUES
			($1, $2, $3, $4, $5)
		RETURNING
			*;
	`
	const queryArgs = [name, image, stockTotal, categoryId, pricePerDay]
	const gamePromise = await connection.query(queryStr, queryArgs)

	return gamePromise.rows[0]
}


export {
	findGames,
	findGameByName,
	insertGame,
}
