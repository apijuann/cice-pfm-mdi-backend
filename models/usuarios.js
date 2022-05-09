import mongoose, { Schema } from 'mongoose'

const usuariosSchema = new Schema({
  rol: { type: String, maxlength: 50, required: true },
  username: { type: String, maxlength: 75, unique: true, required: true },
  password: { type: String, maxlength: 75, required: true },
  email: { type: String, maxlength: 50, unique: true, required: true },
  contacto: { type: String, maxlength: 20 },
  modo: { type: Number, default: 1 },
  fecha_reg: { type: Date, default: Date.now },
})

const Usuarios = mongoose.model('usuarios', usuariosSchema)

export default Usuarios
