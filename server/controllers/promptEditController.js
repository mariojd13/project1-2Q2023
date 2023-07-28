const { Configuration, OpenAIApi } = require("openai");

const PromptEdit = require("../models/promptEditModel");
const Category = require("../models/categoryModel");

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


const promptEditPost = async (req, res) => {
  try {
    const { OpenAIApi } = require("openai");
    const openai = new OpenAIApi(configuration);

    // Define el modelo que deseas utilizar
    const model = "text-davinci-edit-001";

    // Define el input de acuerdo a los datos del body
    const input = req.body.input;

    // Define la instrucción que se enviará como parámetro
    const instruction = req.body.instruction;

    // Llamada a la API de OpenAI para obtener la respuesta
    const response = await openai.createEdit({
      model: model,
      input: input,
      instruction: instruction, // Envía la instrucción como parte de los parámetros
    });

    // Obtén el texto de la respuesta editada
    const editedText = response.data.choices[0].text;

    // Crea el objeto de respuesta con el formato deseado
    const responseObject = {
      object: "edit",
      created: Math.floor(Date.now() / 1000),
      choices: [
        {
          text: editedText,
          index: 0,
        }
      ],
      usage: {
        "prompt_tokens": 25,
        "completion_tokens": 32,
        "total_tokens": 57
      }
    };

    const promptEditData = new PromptEdit({
      name: req.body.name, // Asegúrate de que req.body.name esté disponible en el body
      input: input,
      instruction: instruction,
      response: JSON.stringify(responseObject), // Convierte el objeto en una cadena JSON antes de guardar
    });
    await promptEditData.save();

    // Agrega la ubicación a la respuesta
    res.set('location', `http://localhost:3001/editPrompt/?id=${promptEditData._id}`);

    // Envía la respuesta
    res.json(responseObject);

  } catch (err) {
    console.log('Error while editing text:', err.message);
    res.status(500).json({
      error: 'There was an error editing text'
    });
  }
};



const getAllPromptEdit = async (req, res) => {
  try {
    const promptEditText = await PromptEdit.find({}).exec();
    res.json(promptEditText);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log('Error while querying the Prompt Image', err);
  }
};

const deleteEditPrompt = async (req, res) => {
  try {
    const editId = req.params.id;

    // find the Images by ID and delete it
    const result = await PromptEdit.findByIdAndDelete(editId);

    if (!result) {
      return res.status(404).json({ msg: 'Images not found' });// //not found
    }

    return res.json({ msg: 'Prompt edit deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

const patchPromptEdit = async (req, res) => {
  const editId = req.params.id;

  try {
    const promptEdit = await PromptEdit.findById(editId).exec();

    if (!promptEdit) {
      res.status(404).json({ error: "Prompt Edit doesn't exist" });
      return;
    }

    promptEdit.name = req.body.name || promptEdit.name;
    promptEdit.input = req.body.input || promptEdit.input;
    promptEdit.instruction = req.body.instruction || promptEdit.instruction;

    await promptEdit.save();

    res.status(200).json(promptEdit);
  } catch (error) {
    console.log('Error while querying or saving the Image', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

const postSimpleEditPrompt = async (req, res) => {
  var promptEdit = new PromptEdit();

  const category = await Category.findById(req.body.category_id)

  // Set Image data
  promptEdit.name = req.body.name;
  promptEdit.input = req.body.input;
  promptEdit.instruction = req.body.instruction;
  promptEdit.category = category;

  if (promptEdit.name
    && promptEdit.input
    && promptEdit.instruction
    && promptEdit.category

  ) {// If all required data is provided
    try {
      await promptEdit.save();
      res.status(201);//CREATED
      console.log('Image create OK');
      res.header({
        'location': `api/simpleEditPrompt/?id=${promptEdit.id}`
      });
      res.json(promptEdit);
    } catch (err) {
      res.status(422);//unprocessable entity
      console.log('Error while saving the Image', err);
      res.json({
        error: 'There was an error saving the Image'
      });
    }
  } else {
    res.status(422);//unprocessable entity
    console.log('No valid data provided for Image')
    res.json({
      error: 'No valid data provided for Image'
    });
  }
};







module.exports = {
  executePrompt,
  promptEditPost,
  deleteEditPrompt,
  patchPromptEdit,
  postSimpleEditPrompt,
  getAllPromptEdit
}