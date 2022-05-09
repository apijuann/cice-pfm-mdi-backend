import models from '../models'

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Materias.create(req.body)
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
      const reg = await models.Materias.findOne({ _id: req.query._id })
      if (!reg) {
        res.status(404).send({
          message: '404 material not found',
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
      const reg = await models.Materias.find({})
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
      const reg = await models.Materias.findByIdAndUpdate(
        { _id: req.body._id },
        {
          ref_code: req.body.ref_code,
          curso: req.body.curso,
          tema: req.body.tema,
          editor: req.body.editor,
          cantidad: req.body.cantidad,
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
      const reg = await models.Materias.findByIdAndRemove({
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
}
