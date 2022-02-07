import mongoose from 'mongoose';
import { Password } from '../services/password';

// 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

interface UserAttrs {
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): any;
}

// create 'build' static method in schema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

// middleware before save: hash the password
userSchema.pre('save', async function(done) {
  // if password variable is modified / created
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// use this function to build a new user
// const user = User.build({
//   email: 'test@test.com',
//   password: 'pass',
// });

export { User };