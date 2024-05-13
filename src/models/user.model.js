import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({ 
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
}, {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
)

export default mongoose.model('User', userSchema);