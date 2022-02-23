import { Router } from 'express'

import healthRouter from './healthRouter.js'
import categoriesRouter from './categoriesRouter.js'
import gamesRouter from './gamesRouter.js'
import customersRouter from './customersRouter.js'
import rentalsRouter from './rentalsRouter.js'


const router = Router()

router.use('/health', healthRouter)
router.use('/categories', categoriesRouter)
router.use('/games', gamesRouter)
router.use('/customers', customersRouter)
router.use('/rentals', rentalsRouter)


export default router
