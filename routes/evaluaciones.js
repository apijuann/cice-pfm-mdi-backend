import routerx from 'express-promise-router'
import evaluacionesController from '../controllers/EvaluacionesController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyProfesor, evaluacionesController.add)
router.get('/query', auth.verifyProfesor, evaluacionesController.query)
router.get('/list', auth.verifyProfesor, evaluacionesController.list)
router.put('/activate', auth.verifyProfesor, evaluacionesController.activate)
router.put('/deactivate', auth.verifyProfesor, evaluacionesController.deactivate)

export default router
