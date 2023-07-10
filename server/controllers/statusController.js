const Status = require("../models/statusModel");

/**
 * Creates a category
 *
 * @param {*} req
 * @param {*} res
 */

const statusPost = async (req, res) => {
    let status = new Status();
  
    status.name = req.body.name;
  
    if (status.name) {
      await status.save()
        .then(data => {
          res.status(201); // CREATED
          res.header({
            'location': `/api/status/?id=${data.id}`
          });
          res.json(data);
        })
        .catch( err => {
          res.status(422);
          console.log('error while saving the status', err);
          res.json({
            error: 'There was an error saving the status'
          });
        });
    } else {
      res.status(422);
      console.log('error while saving the status')
      res.json({
        error: 'No valid data provided for status'
      });
    }
  };

const statusGet = (req, res) => {
    // if an specific status is required
    if (req.query && req.query.id) {
    Status.findById(req.query.id, function (err, status) {
            if (err) {
                res.status(404);//not found
                console.log('Error while queryting the status', err)
                res.json({ error: "Status doesnt exist" })
            }
            res.json(status);
        });
    } else {
        // get all status
        Status.find(function (err, statuss) {
            if (err) {
                res.status(422);//unprocessable entity
                res.json({ "error": err });
            }
            res.json(statuss);
        });

    }
};


module.exports = {
    statusPost,
    statusGet,
}