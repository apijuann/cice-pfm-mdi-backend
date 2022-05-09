import models from '../models'

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Tareas.create(req.body)
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
      const reg = await models.Tareas.findOne({
        _id: req.query._id,
      }).populate('materias', { tema: 1 })
      if (!reg) {
        res.status(404).send({
          message: '404 descripcion not found',
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
  queryCode: async (req, res, next) => {
    try {
      const reg = await models.Tareas.findOne({
        code: req.query.code,
      }).populate('materias', { tema: 1 })
      if (!reg) {
        res.status(404).send({
          message: '404 descripcion not found',
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
      const reg = await models.Tareas.find({
        $or: [{ titulo: new RegExp(valor, 'i') }],
      })
        .sort({ fecha_reg: -1 })
        .populate('materias', { tema: 1 })
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
      const reg = await models.Tareas.findByIdAndUpdate(
        { _id: req.body._id },
        {
          materias: req.body.materias,
          titulo: req.body.titulo,
          descripcion: req.body.descripcion,
          duracion: req.body.duracion,
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
      const reg = await models.Tareas.findByIdAndRemove({
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
      const reg = await models.Tareas.findByIdAndUpdate(
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
      const reg = await models.Tareas.findByIdAndUpdate(
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
