import mongoose from 'mongoose';

const passwordRecoverySchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

const PasswordRecovery = mongoose.model('PasswordRecovery', passwordRecoverySchema);

export default PasswordRecovery;
