import mongoose, { Schema } from 'mongoose'

const alumnosSchema = new Schema({
  tipo_acceso: { type: String, maxlength: 20, required: true },
  num_exp: { type: String, maxlength: 20 },
  nombre: { type: String, maxlength: 50, required: true },
  apellidos: { type: String, maxlength: 50, required: true },
  clase: { type: String, maxlength: 25, required: true },
  contacto: { type: String, maxlength: 20 },
  email: { type: String, maxlength: 50, unique: true },
  modo: { type: Number, default: 1 },
  fecha_reg: { type: Date, default: Date.now },
})

const Alumnos = mongoose.model('alumnos', alumnosSchema)

export default Alumnos
