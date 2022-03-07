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


	return {
		queryStr,
		queryArgs,
	}
}


const makeGetMetricsQueryStr = (baseQueryStr, startDate, endDate) => {
	let queryStr = baseQueryStr
	const queryArgs = []

	queryStr += ' WHERE '

	if (startDate) {
		queryArgs.push(startDate)
		queryStr += `"rentDate" >= $${queryArgs.length}`
	}

	if (startDate && endDate) queryStr += ' AND '

	if (endDate) {
		queryArgs.push(endDate)
		queryStr += `"rentDate" <= $${queryArgs.length}`
	}

	if (startDate || endDate) queryStr += ' AND '

	queryStr += '"returnDate" IS NOT null;'


	return {
		queryStr,
		queryArgs,
	}
}


const makePaginationQueryStr = (baseQueryStr, baseQueryArgs, offset, limit) => {
	let queryStr = baseQueryStr
	const queryArgs = [ ...baseQueryArgs ]

	if (offset) {
		queryArgs.push(offset)
		queryStr += ` OFFSET $${queryArgs.length} `
	}

	if (limit) {
		queryArgs.push(limit)
		queryStr += ` LIMIT $${queryArgs.length} `
	}

	queryStr += ';'

	
	return {
		queryStr,
		queryArgs,
	}
}


export { 
	makeGetRentalQueryStr,
	makeGetMetricsQueryStr,
	makePaginationQueryStr,
}
