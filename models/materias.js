import mongoose, { Schema } from 'mongoose'

const materiasSchema = new Schema({
  ref_code: { type: String, maxlength: 9, unique: true, required: true },
  curso: { type: String, maxlength: 25, required: true },
  tema: { type: String, maxlength: 75, required: true },
  editor: { type: String, maxlength: 75 },
  cantidad: { type: Number },
})

const Materias = mongoose.model('materias', materiasSchema)

export default Materias
