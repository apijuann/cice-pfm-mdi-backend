import models from '../models'

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Alumnos.create(req.body)
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Alumnos.findOne({
        _id: req.query._id,
      })
      if (!reg) {
        res.status(404).send({
          message: '404 user not found',
        })
      } else {
        res.status(200).json(reg)
      }
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  list: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.Alumnos.find({
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { apellidos: new RegExp(valor, 'i') },
          { email: new RegExp(valor, 'i') },
        ],
      }).sort({ fecha_reg: -1 })
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  listAlumnos: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.Alumnos.find({
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { apellidos: new RegExp(valor, 'i') },
          { email: new RegExp(valor, 'i') },
        ],
        tipo_acceso: 'Alumno',
      }).sort({ fecha_reg: -1 })
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  listTutores: async (req, res, next) => {
    try {
      let valor = req.query.valor
      const reg = await models.Alumnos.find({
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { apellidos: new RegExp(valor, 'i') },
          { email: new RegExp(valor, 'i') },
        ],
        tipo_acceso: 'Tutor',
      }).sort({ fecha_reg: -1 })
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  }, 
  update: async (req, res, next) => {
    try {
      const reg = await models.Alumnos.findByIdAndUpdate(
        { _id: req.body._id },
        {
          tipo_acceso: req.body.tipo_acceso,
          num_exp: req.body.num_exp,
          nombre: req.body.nombre,
          apellidos: req.body.apellidos,
          clase: req.body.clase,
          contacto: req.body.contacto,
          email: req.body.email,
        }
      )
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Alumnos.findByIdAndRemove({
        _id: req.body._id,
      })
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Alumnos.findByIdAndUpdate(
        { _id: req.body._id },
        { modo: 1 }
      )
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Alumnos.findByIdAndUpdate(
        { _id: req.body._id },
        { modo: 0 }
      )
      res.status(200).json(reg)
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
}
