import tokenService from '../services/token'

export default {
  verifyUsuarios: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'Token not found',
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (
      response.rol === 'Gestor' ||
      response.rol === 'Profesor'
    ) {
      next()
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      })
    }
  },
  verifyGestor: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'Token not found',
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (response.rol === 'Gestor') {
      next()
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      })
    }
  },
  verifyProfesor: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: 'Token not found',
      })
    }
    const response = await tokenService.decode(req.headers.token)
    if (response.rol === 'Profesor') {
      next()
    } else {
      return res.status(403).send({
        message: 'Not authorized',
      })
    }
  },
}
