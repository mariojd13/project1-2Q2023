const Category = require("../models/categoryModel");

/**
 * Creates a category
 *
 * @param {*} req
 * @param {*} res
 */
const categoryPost = async (req, res) => {
  let category = new Category();

  category.name = req.body.name;

  if (category.name) {
    await category.save()
      .then(data => {
        res.status(201); // CREATED
        res.header({
          'location': `/api/categories/?id=${data.id}`
        });
        res.json(data);
      })
      .catch( err => {
        res.status(422);
        console.log('error while saving the category', err);
        res.json({
          error: 'There was an error saving the category'
        });
      });
  } else {
    res.status(422);
    console.log('error while saving the category')
    res.json({
      error: 'No valid data provided for category'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const categoryGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Category.findById(req.query.id)
      .then( (category) => {
        res.json(category);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the category', err)
        res.json({ error: "Category doesnt exist" })
      });
  } else {
    // get all categorys
    Category.find()
      .then( categorys => {
        res.json(categorys);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};


module.exports = {
  categoryGet,
  categoryPost,
}