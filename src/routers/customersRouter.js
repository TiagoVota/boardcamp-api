import { Router } from 'express'

import * as customerController from '../controllers/customerController.js'


const router = new Router()

router.get('', customerController.getCustomers)
router.get('/:customerId', customerController.getCustomer)

router.post('', customerController.postCustomer)

router.put('/:customerId', customerController.editCustomer)


export default router
