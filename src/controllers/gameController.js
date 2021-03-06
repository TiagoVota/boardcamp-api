import * as gameService from '../services/gameService.js'


const getGames = async (req, res, next) => {
	const { query: { name, limit, offset, order, desc } } = req

	try {
		const games = await gameService.listGames({
			name,
			limit,
			offset,
			order,
			desc,
		})
		
		return res.status(200).send(games)

	} catch (error) {		
		next(error)
	}
}


const postGame = async (req, res, next) => {
	const { body: gameInfo } = req

	try {
		const game = await gameService.createGame({ gameInfo })
		
		return res.status(201).send(game)

	} catch (error) {		
		next(error)
	}
}


export {
	getGames,
	postGame,
}
