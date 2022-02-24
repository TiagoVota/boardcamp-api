import connection from '../database/database.js'


const findGames = async ({ name }) => {
	const queryStr = `
		SELECT
			g.*,
			c.name AS "categoryName"
		FROM
			games AS g
		JOIN
			categories AS c
		ON
			g."categoryId" = c.id
		WHERE
			g.name ILIKE $1;
	`
	const queryArgs = [`${name}%`]

	const gamesResult = await connection.query(queryStr, queryArgs)

	return gamesResult.rows
}


const findGameByName = async ({ name }) => {
	const queryStr = `
		SELECT
			*
		FROM
			games
		WHERE
			name = $1;
	`
	const queryArgs = [name]
	const gameResult = await connection.query(queryStr, queryArgs)
	
	const game = gameResult.rows[0]

	if (!game) return null
	return game
}


const findGameById = async ({ id }) => {
	const queryStr = `
		SELECT
			*
		FROM
			games
		WHERE
			id = $1;
	`
	const queryArgs = [id]
	const gameResult = await connection.query(queryStr, queryArgs)
	
	const game = gameResult.rows[0]

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
	const gameResult = await connection.query(queryStr, queryArgs)

	return gameResult.rows[0]
}


export {
	findGames,
	findGameByName,
	findGameById,
	insertGame,
}
