import mongoose from 'mongoose'

const pantrySchema = new mongoose.Schema({
  owner_id: {
    type: String,
    required: true,
    unique: true,
  },
})

const Pantry = mongoose.model('Pantry', pantrySchema)

export default Pantry
