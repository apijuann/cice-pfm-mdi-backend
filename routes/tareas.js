import routerx from 'express-promise-router'
import tareasController from '../controllers/TareasController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyProfesor, tareasController.add)
router.get('/query', auth.verifyProfesor, tareasController.query)
router.get('/queryCode', auth.verifyProfesor, tareasController.queryCode)
router.get('/list', auth.verifyProfesor, tareasController.list)
router.put('/update', auth.verifyProfesor, tareasController.update)
router.delete('/remove', auth.verifyGestor, tareasController.remove)
router.put('/activate', auth.verifyProfesor, tareasController.activate)
router.put('/deactivate', auth.verifyProfesor, tareasController.deactivate)

export default router
