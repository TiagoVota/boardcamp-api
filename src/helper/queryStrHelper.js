const makeGetRentalQueryStr = (baseQueryStr, queryParams) => {
	const { customerId, gameId, status, startDate, endDate } = queryParams

	let queryStr = baseQueryStr
	const queryArgs = []

	if (Object.keys(queryParams).length !== 0) queryStr += ' WHERE '

	let customerStr = '1 = 1'
	if (customerId) {
		queryArgs.push(customerId)
		customerStr = `r."customerId" = $${queryArgs.length}`
	}
	queryStr += `${customerStr} AND `

	let gameStr = '1 = 1'
	if (gameId) {
		queryArgs.push(gameId)
		gameStr = `r."gameId" = $${queryArgs.length}`
	}
	queryStr += `${gameStr} AND `

	let statusStr = '1 = 1'
	if (isValidStatus(status)) {
		const statusOperator = Boolean(status.toLowerCase() === 'open')
			? 'IS'
			: 'IS NOT'
		
		statusStr = `r."returnDate" ${statusOperator} NULL`
	}
	queryStr += `${statusStr} AND `

	let startDateStr = '1 = 1'
	if (startDate) {
		queryArgs.push(startDate)
		startDateStr = `r."rentDate" >= $${queryArgs.length}`
	}
	queryStr += `${startDateStr} AND `

	let endDateStr = '1 = 1'
	if (endDate) {
		queryArgs.push(endDate)
		endDateStr = `r."rentDate" <= $${queryArgs.length}`
	}
	queryStr += `${endDateStr} `


	return {
		queryStr,
		queryArgs,
	}
}

const isValidStatus = (status) => {
	return ['open', 'closed'].includes(status?.toLowerCase())
}


const makeGetMetricsQueryStr = (baseQueryStr, queryParams) => {
	const { startDate, endDate } = queryParams

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


const makeOrderByQuery = (order, orderByFilters, isDesc) => {
	return Boolean(order && orderByFilters[order])
		? ` ORDER BY ${orderByFilters[order]} ${isDesc ? 'DESC' : ''} `
		: ''
}


export { 
	makeGetRentalQueryStr,
	makeGetMetricsQueryStr,
	makePaginationQueryStr,
	makeOrderByQuery,
}
