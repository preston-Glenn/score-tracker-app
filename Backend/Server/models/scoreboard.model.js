const mongoose = require('mongoose')


const schema = mongoose.Schema;

const scoreboardSchema = new schema({
    scoreboardName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    index: true
  },
  userScores: {
    type: [{
      userIDs: String,
      username: String,
      userscore: Number
    }],
    required: true,
    trim: true,
    minlength: 0
  },
}, {
  timestamps: true,
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = Scoreboard;