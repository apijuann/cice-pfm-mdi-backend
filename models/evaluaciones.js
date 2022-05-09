import mongoose, { Schema } from 'mongoose'

const evaluacionesSchema = new Schema({
  usuarios: { type: Schema.ObjectId, ref: 'usuarios', required: true },
  alumnos: { type: Schema.ObjectId, ref: 'alumnos', required: true },
  periodo: { type: String, maxlength: 20 },
  examen: [
    {
      _id: { type: String, required: true },
      materia: { type: String, required: true },
      nota: { type: Number, required: true },
    },
  ],
  modo: { type: Number, default: 1 },
  fecha_reg: { type: Date, default: Date.now },
})

const Evaluaciones = mongoose.model('evaluaciones', evaluacionesSchema)

export default Evaluaciones
