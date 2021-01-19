const router = require('express').Router();
let Scoreboard = require('../models/scoreboard.model');
let User = require('../models/user.model');
var ObjectId = require('mongodb').ObjectID;

router.route('/').get((req, res) => {
  console.log("/");
  Scoreboard.find()
    .then(scoreboards => {
      res.json(scoreboards)
    }
    )
    .catch(err => res.json('Error: ' + err));
});

router.route('/ss/:id').get((req, res) => {
  Scoreboard.findById(req.params.id).then(response => res.json(response)).catch(err => res.json('Error: ' + err));
});

// router.route('/:scoreboardName/:username').get((req, res) => {
//   Scoreboard.find()
//     .then(scoreboards => {
//       res.json(scoreboards)
//     }
//     )
//     .catch(err => res.json('Error: ' + err));
// });

router.route('/:id').patch(async(req, res) => {
  console.log("called")
  await Scoreboard.updateOne({_id:req.params.id},req.body.scoreboard)
      .catch(err => {
        res.status(400).json('Error: ' + err)
        console.log(err)
      });
  await Scoreboard.findById(req.params.id).then(response => res.json(response))
      .catch(err => {
        res.status(400).json('Error: ' + err)
        console.log(err)
        return
      })
      
});




//https://stackoverflow.com/questions/15102532/mongo-find-through-list-of-ids
//https://www.bing.com/search?q=can+you+query+mongodb+by+a+list+of+object+Ids&cvid=2ef5c8b2360247b59bb4862ce6f6ed8b&FORM=ANAB01&PC=U531

//Returns all scoreboards of a user
router.route('/:user_id').get(async(req, res) => {

  const foundUser = await User.findById(req.params.user_id).catch(err => res.json('Error: ' + err));
  var obj_ids = foundUser.scorboards_ID.map(function(id) { return ObjectId(id); });
  Scoreboard.find({_id: {$in: obj_ids}})
    .then(sb => res.json(sb))
    .catch(err => res.json('Error: ' + err));
});


router.route('/new').post( async (req, res) => {
  const scoreboardName = req.body.scoreboardName;
  const username = req.body.username;
  var id = await User.findOne({username: username})

  const newScoreboard = new Scoreboard({
    scoreboardName:scoreboardName,
    userScores: [
      {
        userIDs: id._id,
        username: username,
        userscore: 0
      }
    ]
  });

  let sb
  newScoreboard.save().then( (result) =>{
    User.updateOne({username:username},{ $push: { scorboards_ID: result._id } }).then(res.json(result))
    
  }
  ).catch(err => res.json('Error: ' + err));
  
  
 
  // ).catch(err => res.json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;