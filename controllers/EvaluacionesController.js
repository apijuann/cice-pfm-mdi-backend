import models from '../models'
async function addEvaluaciones(_idEvaluaciones, nota) {
  let { notas } = models.Tareas.findOne({ _id: _idEvaluaciones })
  let newNotas = parseInt(notas) + parseInt(nota)
  const reg = await models.Tareas.findByIdAndUpdate(
    { _id: _idEvaluaciones },
    { notas: newNotas }
  )
}

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Evaluaciones.create(req.body)
      // Acualizar notas
      let examen = req.body.examen
      examen.map(function (exam) {
        addEvaluaciones(exam._id, exam.nota)
      })
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
      const reg = await models.Evaluaciones.findOne({
        _id: req.query._id,
      })
        .populate('usuarios', { rol: 1 })
        .populate('alumnos', { nombre: 1 })
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
      const reg = await models.Evaluaciones.find({
        $or: [{ periodo: new RegExp(valor, 'i') }],
      })
        .sort({ fecha_reg: -1 })
        .populate('usuarios', { rol: 1 })
        .populate('alumnos', { nombre: 1 })
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
      const reg = await models.Evaluaciones.findByIdAndUpdate(
        { _id: req.body._id },
        { modo: 1 }
      )
      // Acualizar notas
      let examen = req.examen
      examen.map(function (exam) {
        addEvaluaciones(exam._id, exam.nota)
      })
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
      const reg = await models.Evaluaciones.findByIdAndUpdate(
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
