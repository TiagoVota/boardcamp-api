import { dayDifference } from '../utils/dayjs.service.js'


const calculateDelayFee = (rentDate, daysRented, pricePerDay) => {
	const devolutionDiff = dayDifference(rentDate, new Date())
	const surplus = devolutionDiff - daysRented

	return Boolean(surplus > 0) ? (Number(pricePerDay) * surplus) : 0
}


const sanitizeRentals = rentals => rentals.map(sanitizeRental)

const sanitizeRental = (rental) => {
	const {
		customerId,
		gameId,
		customerName,
		gameName,
		categoryId,
		categoryName,
	} = rental
	
	const customer = {
		id: customerId,
		name: customerName,
	}
	const game = {
		id: gameId,
		name: gameName,
		categoryId,
		categoryName,
	}

	const removedRental = removeRentalProps(rental)

	return {
		...removedRental,
		customer,
		game,
	}
}

const removeRentalProps = (rental) => {
	rental = { ...rental }

	const toRemoveProps = [
		'customerName',
		'gameName',
		'categoryId',
		'categoryName'
	]

	toRemoveProps.forEach(propName => delete rental[propName])

	return rental
}


export {
	calculateDelayFee,
	sanitizeRentals,
}
