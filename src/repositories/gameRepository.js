import connection from '../database/database.js'


const findGames = async ({ name }) => {
	const queryStr = `
		SELECT * FROM games;
	`
	const gamesPromise = await connection.query(queryStr)

	return gamesPromise.rows
}


export {
	findGames,
}
