import mongoose from 'mongoose';
import { Password } from '../services/password';

// schema is to tell mongoose the properties it needs to have
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  // modify what JSON is returned from this object
  toJSON: {
    transform(doc, ret) {
      // change _id variable to id
      ret.id = ret._id;
      delete ret._id;

      // remove password and version
      delete ret.password;
      delete ret.__v;
    }
  }
}
);

// interface for attributes of user 
interface UserAttrs {
  email: string;
  password: string;
}

// creating mongoose model
// represents one single user
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// represents the entire collection of users
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): any;
}

// create build method in schema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

// middleware before save: hashing the password
userSchema.pre('save', async function (done) {
  // if password is modified / just created
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

// use this function to build a new user
// const user = User.build({
//   email: 'test@test.com',
//   password: 'pass',
// });