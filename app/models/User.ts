import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', function(next) {
  if (this.isModified('password') && this.password) {
    bcrypt.hash(this.password as string, 12)
      .then(hashedPassword => {
        this.password = hashedPassword;
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

// Add method to check password
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User; 