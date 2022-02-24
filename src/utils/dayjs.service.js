import dayjs from 'dayjs'


const formatDateISO = date => dayjs(date).format('YYYY-MM-DD')


export {
	formatDateISO,
}
