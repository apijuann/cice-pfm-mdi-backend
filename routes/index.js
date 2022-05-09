import routerx from 'express-promise-router'
import tareasRouter from './tareas'
import materiasRouter from './materias'
import usuariosRouter from './usuarios'
import alumnosRouter from './alumnos'
import evaluacionesRouter from './evaluaciones'


const router = routerx()

router.use('/tareas', tareasRouter)
router.use('/materias', materiasRouter)
router.use('/usuarios', usuariosRouter)
router.use('/alumnos', alumnosRouter)
router.use('/evaluaciones', evaluacionesRouter)
export default router
