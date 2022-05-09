import models from '../models'
import bcrypt from 'bcryptjs'
import token from '../services/token' 

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      const reg = await models.Usuarios.create(req.body)
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
      const reg = await models.Usuarios.findOne({
        _id: req.query._id,
      }).populate('usuarios', { tema: 1 })
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
      const reg = await models.Usuarios.find({
        $or: [
          { username: new RegExp(valor, 'i') },
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
  update: async (req, res, next) => {
    try {
      let psw = req.body.password
      const reg0 = await models.Usuarios.findOne({ _id: req.body._id })
      if (psw != reg0.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }
      const reg = await models.Usuarios.findByIdAndUpdate(
        { _id: req.body._id },
        {
          rol: req.body.rol,
          username: req.body.username,
          contacto: req.body.contacto,
          email: req.body.email,
          password: req.body.password,
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
      const reg = await models.Usuarios.findByIdAndRemove({
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
      const reg = await models.Usuarios.findByIdAndUpdate(
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
      const reg = await models.Usuarios.findByIdAndUpdate(
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
  login: async (req, res, next) => {
    try {
      let user = await models.Usuarios.findOne({
        email: req.body.email,
        modo: 1,
      })
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
          let tokenLog = await token.encode(user._id)
          res.status(200).json({ user, tokenLog })
        } else {
          res.status(404).send({
            message: 'The password is wrong',
          })
        }
      } else {
        res.status(404).send({
          message: '404 user not found',
        })
      }
    } catch (err) {
      res.status(500).send({
        message: '500 internal error',
      })
      next(err)
    }
  },
}
