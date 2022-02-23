import { Router } from 'express'

import * as categoryController from '../controllers/categoryController.js'


const router = new Router()

router.get('', categoryController.getCategories)

router.post('', categoryController.postCategory)


export default router
