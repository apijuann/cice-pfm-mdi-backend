import routerx from 'express-promise-router'
import alumnosController from '../controllers/AlumnosController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyGestor, alumnosController.add)
router.get('/query', auth.verifyUsuarios, alumnosController.query)
router.get('/list', auth.verifyUsuarios, alumnosController.list)
router.get('/listAlumnos', auth.verifyUsuarios, alumnosController.listAlumnos)
router.get('/listTutores', auth.verifyUsuarios, alumnosController.listTutores)
router.put('/update', auth.verifyGestor, alumnosController.update)
router.delete('/remove', auth.verifyGestor, alumnosController.remove)
router.put('/activate', auth.verifyGestor, alumnosController.activate)
router.put('/deactivate', auth.verifyGestor, alumnosController.deactivate)

export default router
