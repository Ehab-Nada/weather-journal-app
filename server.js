// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance -- external source
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// post route
app.post("/post", async function (req, res) {
  const body = await req.body;
  projectData = body;
  res.status(200).send(projectData);
});

//get route
app.get("/get", async (req, res) => {
  res.send(projectData);
});

// Setup Server
const port = 7000;
app.listen(port, () => console.log(`lisening on port ${port}`));
