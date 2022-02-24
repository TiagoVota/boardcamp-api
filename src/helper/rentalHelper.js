import { dayDifference } from '../utils/dayjs.service.js'


const calculateDelayFee = (rentDate, daysRented, pricePerDay) => {
	const devolutionDiff = dayDifference(rentDate, new Date())
	const surplus = devolutionDiff - daysRented

	return Boolean(surplus > 0) ? (Number(pricePerDay) * surplus) : 0
}


export {
	calculateDelayFee,
}
