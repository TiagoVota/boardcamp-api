const makeGetRentalQueryStr = (baseQueryStr, customerId, gameId) => {
	let queryStr = baseQueryStr
	const queryArgs = []

	if (customerId || gameId) queryStr += ' WHERE '

	if (customerId) {
		queryArgs.push(customerId)
		queryStr += `r."customerId" = $${queryArgs.length}`
	}

	if (customerId && gameId) queryStr += ' AND '

	if (gameId) {
		queryArgs.push(gameId)
		queryStr += `r."gameId" = $${queryArgs.length}`
	}

	queryStr += ';'

	return {
		queryStr,
		queryArgs,
	}
}


export { 
	makeGetRentalQueryStr,
}
