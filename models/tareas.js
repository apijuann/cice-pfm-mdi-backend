import mongoose, { Schema } from 'mongoose'

const tareasSchema = new Schema({
  materias: { type: Schema.ObjectId, ref: 'materias' },
  titulo: { type: String, maxlength: 75, unique: true, required: true },
  descripcion: { type: String, maxlength: 255, required: true },
  duracion: { type: String, required: true },
  nota: { type: Number },
  modo: { type: Number, default: 1 },
  fecha_reg: { type: Date, default: Date.now },
})

const Tareas = mongoose.model('tareas', tareasSchema)

export default Tareas
