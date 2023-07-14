const { Configuration, OpenAIApi } = require("openai");

const PromptImage = require("../models/promptModel");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

/**
 * Executes prompt
 *
 * @param {*} req
 * @param {*} res
 */
const executePrompt = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();

  res.status(200); // CREATED

  res.json(response);

};

// const createImage = async (req, res) => {
//   const { OpenAIApi } = require("openai");
//   const openai = new OpenAIApi(configuration);
//   const response = await openai.createImage({
//     prompt: "Bob Esponja en un cadillac",
//     n: 2,
//     size: "1024x1024",
//   });
//   if(response) {
//     res.status(201); // CREATED
//     res.json(response.data);
//   } else {
//     res.status(422);
//     res.json({
//       message: "There was an error executing the open AI method"
//     })
//   }
// }


const promptImagePost = async (req, res) => {
  try {
    const { OpenAIApi } = require("openai");
    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: req.body.n,
      size: req.body.size,
    });
    console.log(response.data);
    if (response) {
      const promptImage = new PromptImage({
        name: req.body.name,
        prompt: req.body.prompt,
        response: JSON.stringify(response.data), // Convertir a cadena JSON
        n: req.body.n,
        size: req.body.size,
      });

      if (
        response.data &&
        response.data.url &&
        Array.isArray(response.data.url) &&
        response.data.url.length >= 2
      ) {
        promptImage.url1 = response.data[0].url1;
        promptImage.url2 = response.data[1].url2;
      } else {
        // Manejar el caso en el que la estructura no sea la esperada
        console.log('Invalid data structure for image URL');
      }

      try {
        await promptImage.save();
        console.log('Image created successfully');
        res.header({
          'location': `http://localhost:3001/imagePrompt/?id=${promptImage.id}`
        });
        res.json(promptImage);
      } catch (err) {
        res.status(422);
        console.log('Error while saving the image', err);
        res.json({
          error: 'There was an error saving the image'
        });
      }
    } else {
      res.status(422);
      console.log('No valid data provided for image');
      res.json({
        error: 'No valid data provided for image'
      });
    }
  } catch (err) {
    console.log('Error while creating prompt image:', err);
    res.status(500).json({
      error: 'There was an error creating the prompt image'
    });
  }
};

// const getAllPromptImages = async (req, res) => {
//   try {
//     const promptImages = await PromptImage.find();
//     res.json(promptImages);
//   } catch (err) {
//     console.log('Error while retrieving prompt images:', err);
//     res.status(500).json({
//       error: 'There was an error retrieving prompt images'
//     });
//   }
// };

const getAllPromptImages = async (req, res) => {
  try {
    const promptImages = await PromptImage.find({}).exec();
    res.json(promptImages);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log('Error while querying the Prompt Image', err);
  }
};





  module.exports = {
    executePrompt,
    promptImagePost,
    getAllPromptImages
  }