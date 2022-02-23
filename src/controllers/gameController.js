import * as gameService from '../services/gameService.js'


const getGames = async (req, res, next) => {
	const { query: { name } } = req

	try {
		const games = await gameService.listGames({ name })
		
		return res.status(200).send(games)

	} catch (error) {		
		next(error)
	}
}


export {
	getGames,
}
