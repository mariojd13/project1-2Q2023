const User = require("../models/userModel");
const Role = require("../models/roleModel");
const Status = require("../models/statusModel");
const crypto = require('crypto');

const userPost = async (req, res) => {
  var user = new User();

  const role = await Role.findById(req.body.role_id) // Get role by ID
  const status = await Status.findById(req.body.status_id) 
  
  // Set user data
  user.email = req.body.email;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.password1 = crypto.createHash('md5').update(req.body.password1).digest("hex");
  user.password2 = crypto.createHash('md5').update(req.body.password2).digest("hex");

  user.role = role;
  user.status = status;
  if (user.email
    && user.first_name
    && user.last_name
    && user.password1
    && user.password2
    && user.password1 === user.password2
    && user.role
    && user.status

  ) {// If all required data is provided
    try {
      await user.save();
      res.status(201);//CREATED
      console.log('User create OK');
      res.header({
        'location': `http://localhost:3001/user/?id=${user.id}`
      });
      res.json(user);
    } catch (err) {
      res.status(422);//unprocessable entity
      console.log('Error while saving the user', err);
      res.json({
        error: 'There was an error saving the user'
      });
    }
  } else {
    res.status(422);//unprocessable entity
    console.log('No valid data provided for user')
    res.json({
      error: 'No valid data provided for user'
    });
  }
};

const userGet = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.id) {
    User.findById(req.query.id)
      .then((user) => {
        res.json(user);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      });
  } else {
    // get all users
    User.find()
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};


const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;

    // find the user by ID and delete it
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).json({ msg: 'User not found' });// //not found
    }

    return res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};


const getAllUsers = (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500);//Internal server error
      console.log('Error while querying the users', err);
      res.json({ error: "Internal server error" });
    } else {
      res.json(users);
    }
  });
};


const activateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // find the user by ID and update the status
    const result = User.findByIdAndUpdate(userId, { status: "Active" }, function (err, user) {
      if (err) {
        console.log("Error while updating user status", err);
        // handle error response
      } else if (!user) {
        console.log("User not found");
        // handle not found response
      } else {
        console.log("User status updated successfully");
        // handle success response
      }
    });

    if (result.nModified === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    return res.json({ msg: 'User status updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};


// SIN EL CHECK BOX

const userPatch = (req, res) => {
  // Get user by id
  console.log(req.body);

  if (req.body && req.body._id) {
    console.log(req._id)
    User.findById(req.body._id, function (err, user) {
      if (err) {
        res.status(404);//Not Found
        console.log('Error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
      user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
      user.role = req.body.role ? req.body.role : user.role;
      user.status = req.body.status ? req.body.status : user.status;
      user.save(function (err) {
        if (err) {
          res.status(400);//bad requests
          console.log('Error while saving the user', err)
          res.json({
            error: 'There was an error saving the user'
          });
        }
        res.status(200); // OK
        res.json(user);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "User doesnt exist" })
  }
};


module.exports = {
  userPost,
  userGet,
  userPatch,
  userDelete,
  getAllUsers
}
