const Role = require("../models/roleModel");

/**
 * Creates a category
 *
 * @param {*} req
 * @param {*} res
 */

const rolePost = async (req, res) => {
    let role = new Role();
  
    role.name = req.body.name;
  
    if (role.name) {
      await role.save()
        .then(data => {
          res.status(201); // CREATED
          res.header({
            'location': `/api/role/?id=${data.id}`
          });
          res.json(data);
        })
        .catch( err => {
          res.status(422);
          console.log('error while saving the role', err);
          res.json({
            error: 'There was an error saving the role'
          });
        });
    } else {
      res.status(422);
      console.log('error while saving the role')
      res.json({
        error: 'No valid data provided for role'
      });
    }
  };

const roleGet = (req, res) => {
    // if an specific Role is required
    if (req.query && req.query.id) {
        Role.findById(req.query.id, function (err, role) {
            if (err) {
                res.status(404);//not found
                console.log('Error while queryting the Role', err)
                res.json({ error: "Role doesnt exist" })
            }
            res.json(role);
        });
    } else {
        // get all Roles
        Role.find(function (err, roles) {
            if (err) {
                res.status(422);//unprocessable entity
                res.json({ "error": err });
            }
            res.json(roles);
        });

    }
};


module.exports = {
    rolePost,
    roleGet,
}