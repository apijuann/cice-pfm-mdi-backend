import routerx from 'express-promise-router'
import materiasController from '../controllers/MateriasController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyGestor, materiasController.add)
router.get('/query', materiasController.query)
router.get('/list', materiasController.list)
router.put('/update', auth.verifyGestor, materiasController.update)
router.delete('/remove', auth.verifyGestor, materiasController.remove)

export default router
