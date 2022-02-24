import { Router } from 'express'

import * as rentalController from '../controllers/rentalController.js'


const router = new Router()

router.get('', rentalController.getRentals)

// router.post('', rentalController.controllerFunction)
// router.post('/:rentalId/return', rentalController.controllerFunction)

// router.delete('/:rentalId', rentalController.controllerFunction)


export default router
