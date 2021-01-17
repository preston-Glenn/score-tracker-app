const mongoose = require('mongoose')



const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    index: true
  },
  scorboards_ID: {
    type: [schema.Types.ObjectId],
    required: true,
    trim: true,
    minlength: 0
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;