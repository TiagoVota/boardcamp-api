import * as queryStrHelper from '../helper/queryStrHelper.js'

import connection from '../database/database.js'


const findGames = async ({ name, limit, offset, order, desc }) => {
	const orderByFilters = {
		id: 1,
		name: 2,
		stockTotal: 4,
		categoryId: 5,
		pricePerDay: 6,
		categoryName: 7,
		rentalsCount: 8,
	}

	const baseQueryStr = `
		SELECT
			g.*,
			c.name AS "categoryName",
			COUNT(r.id) AS "rentalsCount"
		FROM
			games AS g
		JOIN
			categories AS c
		ON
			g."categoryId" = c.id
		LEFT JOIN
			rentals AS r
		ON 
			g.id = r."gameId"
		WHERE
			g.name ILIKE $1
		GROUP BY
			g.id, c.name
		${queryStrHelper.makeOrderByQuery(order, orderByFilters, desc)}
	`
	const baseQueryArgs = [`${name}%`]

	const {	queryStr,	queryArgs } = queryStrHelper.makePaginationQueryStr(
		baseQueryStr,
		baseQueryArgs,
		offset,
		limit
	)

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
