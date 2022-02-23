import { Router } from 'express'

import * as gameController from '../controllers/gameController.js'


const router = new Router()

router.get('', gameController.getGames)

// router.post('', gameController.postGame)


export default router
