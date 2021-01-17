const router = require('express').Router();
const { response } = require('express');
let User = require('../models/user.model');
let Scoreboard = require('../models/scoreboard.model');

router.route('/:username').get((req, res) => {
  User.findOne({username: req.params.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id/:id').get((req, res) => {
  User.findById(req.params.id).then(response => res.json(response)).catch(err => res.json('Error: ' + err));
});


router.route('/add/:username').post((req, res) => {
  const username = req.params.username;
  const newUser = new User({username: username});
  
  newUser.save()
    .then(response => res.json(response))
    .catch(err => res.json('Error: ' + err));
});



router.route('/addUserToScoreboard/:sb_id').post(async (req, res) => {
  const sb_id = req.params.sb_id;
  const user = await User.find({username:req.body.username})


  if(user.length > 0){
    const  userScore = {
        userIDs: user._id,
        username: req.body.username,
        userscore: 0
      }

    //add userScore to scoreboard
    await Scoreboard.updateOne({_id:sb_id},{ $push: { userScores: userScore } })
    Scoreboard.findById(sb_id).then(response => res.json(response))
    //add sb id to user
    await User.updateOne({username:req.body.username},{ $push: { scorboards_ID: sb_id } })
    
  } else {
    
    let  userScore = {}

    const username = req.body.username;
    const newUser = new User({username: username});
    console.log("else1")
    await newUser.save()
    .then(response => {
      userScore = {
        userIDs: response._id,
        username: req.body.username,
        userscore: 0
      };
      console.log("else2")
    }).then(User.updateOne({username:req.body.username},{ $push: { scorboards_ID: sb_id } }))
    .catch(err => {
      console.log(err)
      res.json('Error: ' + err)
      return
    });
    
    await Scoreboard.updateOne({_id:sb_id},{ $push: { userScores: userScore } }).then( response => res.json(response) )

}


});


module.exports = router;