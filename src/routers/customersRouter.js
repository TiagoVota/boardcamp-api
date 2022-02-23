import { Router } from 'express'

import * as customerController from '../controllers/customerController.js'


const router = new Router()

router.get('', customerController.getCustomers)
// router.get('/:customerId', customerController.controllerFunction)

// router.post('', customerController.controllerFunction)

// router.put('/:customerId', customerController.controllerFunction)


export default router
