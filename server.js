const express = require("express");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const ejs = require("ejs");

// app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
mongoose
  .connect(
    "mongodb+srv://topgun:b12bomber@cluster0.9gyztmd.mongodb.net/uname?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((e) => {
    console.log("Error:", e);
  });

const nameSchema = {
  title: String,
  content: String,
};

const Uname = mongoose.model("Names", nameSchema);

app.get("/", (req, res) => {
  Uname.find({}, function (err, names) {
    //takes in all the data
    res.render("index", {
      namesList: names,
    });
  });
});

// app.get("/", (req, res) => {
//   let name = "Ngawang";

//   res.render("index", {
//     userName: name,
//   });
// });

// app.post("/", function (req, res) {
//   let newName = new Uname({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   newName.save();
//   res.redirect("/");
// });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
