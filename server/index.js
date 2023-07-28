require('dotenv').config();

const User = require('./models/userModel');
const jwt = require("jsonwebtoken");



const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB_CONNECTION_STRING);


const theSecretKey = process.env.JWT_SECRET;


//SESSION

const {

  sessionPost,
  sessionGet,
} = require("./controllers/sessionController.js");

// Categories

const {
  categoryPost,
  categoryGet
} = require("./controllers/typeController.js");

// Prompts Image

const {
  promptImagePost,
  getAllPromptImages,
  deletePromptImage,
  patchPromptImage,
  postSimpleImagePrompt,
} = require("./controllers/promptImageController.js");

// Prompts Edit

const {
  promptEditPost,
  getAllPromptEdit,
  deleteEditPrompt,
  patchPromptEdit,
  postSimpleEditPrompt,
} = require("./controllers/promptEditController.js");


// Rols

const {
  rolePost,
  roleGet,
} = require("./controllers/roleController.js");

// Status

const {
  statusPost,
  statusGet,
} = require("./controllers/statusController.js");


// Users


const {
  userPost,
  userGet,
  userPatch,
  userDelete,
  getAllUsers,
  //activateUser,
} = require("./controllers/userController.js");



// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));



// // login with JWT
// app.post("/api/session", async function (req, res) {
//   const { email, password1 } = req.body;

//   try {
//     // Buscar al usuario en la base de datos
//     const user = await User.findOne({ email, password1 });
//     console.log("User:", user);

//     if (user) {
//       // Si se encuentra el usuario, generar el token JWT con la información del usuario
//       const token = jwt.sign(
//         {
//           userId: user._id,
//           name: user.email,
//           permission: ["create", "edit", "delete"], // Aquí puedes obtener los permisos del usuario desde la base de datos
//           deviceId: "123",
//         },
//         theSecretKey
//       );

//       res.status(201).json({ token });
//     } else {
//       res.status(422).json({ error: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

//back up


// login with JWT
app.post("/api/session", async function (req, res) {
  const { email, password1 } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email, password1 });
    console.log("User:", user);

    if (user) {
      // Si se encuentra el usuario, generar el token JWT con la información del usuario
      const token = jwt.sign(
        {
          userId: user._id,
          name: user.email,
          permission: ["create", "edit", "delete"], // Aquí puedes obtener los permisos del usuario desde la base de datos
          deviceId: "123",
        },
        theSecretKey
      );

      res.status(201).json({ token });
    } else {
      res.status(422).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




// // JWT Authentication middleware
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     const authToken = req.headers["authorization"].split(" ")[1];
//     try {
//       jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
//         if (err || !decodedToken) {
//           res.status(401);
//           res.json({
//             error: "Unauthorized3",
//           });
//         } else {
//           console.log("Welcome", decodedToken.name);
//           next();
//         }
//       });
//     } catch (e) {
//       res.status(401);
//       res.send({
//         error: "Unauthorized4",
//       });
//     }
//   } else {
//     res.status(401);
//     res.send({
//       error: "Unauthorized5",
//     });
//   }
// });
// JWT Authentication middleware
app.use(function (req, res, next) {
  if (req.headers["authorization"] && req.headers["authorization"].startsWith("Bearer ")) {
    const authToken = req.headers["authorization"].substring(7); // Eliminar el prefijo "Bearer " para obtener solo el token
    try {
      const decodedToken = jwt.verify(authToken, theSecretKey);
      console.log("Decoded token:", decodedToken);
      if (decodedToken) {
        // El token es válido, se puede acceder a los datos decodificados como decodedToken
        console.log("Welcome", decodedToken.name);
        req.user = decodedToken; // Opcional: Puedes guardar los datos del usuario en req.user para usarlos en otras rutas
        next();
      } else {
        console.log("Token is invalid");
        res.status(401);
        res.json({
          error: "Unauthorized3",
        });
      }
    } catch (e) {
      console.log("Error while verifying token:", e.message);
      res.status(401);
      res.send({
        error: "Unauthorized4",
      });
    }
  } else {
    console.log("Authorization header not found or invalid format");
    res.status(401);
    res.send({
      error: "Unauthorized5",
    });
  }
});







//SESSIION

app.post("/session", sessionPost);
app.get("/session", sessionGet);

// Rols

app.post("/api/role", rolePost);
app.get("/api/role", roleGet);

// Status

app.post("/api/status", statusPost);
app.get("/api/status", statusGet);

// Categories
app.get("/api/categories", categoryGet);
app.post("/api/categories", categoryPost);

//Prompts Image
app.get("/api/imagePrompt", getAllPromptImages);
app.post("/api/imagePrompt", promptImagePost);
app.post("/api/simpleImagePrompt", postSimpleImagePrompt);
app.delete("/api/imagePrompt/:id", deletePromptImage);
app.patch("/api/imagePrompt/:id", patchPromptImage);

//Prompts Edit
app.post("/api/editPrompt", promptEditPost);
app.delete("/api/editPrompt/:id", deleteEditPrompt);
app.patch("/api/editPrompt/:id", patchPromptEdit);
app.get("/api/editPrompt", getAllPromptEdit);
app.post("/api/simpleEditPrompt", postSimpleEditPrompt);
// User
app.post("/api/user", userPost);
app.get("/api/user", userGet);
app.patch("/api/user", userPatch);
//app.patch("/api/user/:id", activateUser);
app.delete("/api/user/:id", userDelete);



app.listen(3001, () => console.log(`Project app listening on port 3001!`))
