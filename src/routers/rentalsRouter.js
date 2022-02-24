import { Router } from 'express'

import * as rentalController from '../controllers/rentalController.js'


const router = new Router()

router.get('', rentalController.getRentals)

router.post('', rentalController.postRental)
router.post('/:rentalId/return', rentalController.postReturnRental)

router.delete('/:rentalId', rentalController.deleteRental)


export default router
