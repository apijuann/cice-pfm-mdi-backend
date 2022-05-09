import routerx from 'express-promise-router'
import usuariosController from '../controllers/UsuariosController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyGestor, usuariosController.add)
router.get('/query', usuariosController.query)
router.get('/list', usuariosController.list)
router.put('/update', usuariosController.update)
router.delete('/remove', auth.verifyGestor, usuariosController.remove)
router.put('/activate', auth.verifyProfesor, usuariosController.activate)
router.put('/deactivate', auth.verifyProfesor, usuariosController.deactivate)
router.post('/login', usuariosController.login)

export default router
