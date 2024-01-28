const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const runCompletion = require("./chat");

const app = express();
const port = 2900;
app.use(fileUpload());
app.use(cors());

app.use("/public", express.static("public"));

app.post("/process", async (req, res) => {
  console.log("Request received");
  if (!req.files.image) {
    return res.status(400).send("No files were uploaded.");
  }
  const uploadedFile = req.files.image;
  console.log("success");
  console.log(req.files.image);
  var chat = await runCompletion(uploadedFile);
  res.send({ fileName: uploadedFile.name, fileSize: uploadedFile.size });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
