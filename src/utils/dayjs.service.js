import dayjs from 'dayjs'


const formatDateISO = date => dayjs(date || new Date()).format('YYYY-MM-DD')


const dayDifference = (firstDate, secondDate) => {
	firstDate = dayjs(firstDate)
	secondDate = dayjs(secondDate)

	return secondDate.diff(firstDate, 'd')
}


export {
	formatDateISO,
	dayDifference,
}
