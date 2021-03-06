const express = require("express")
const app = express();
const { c, cpp, python, node } = require("compile-run");
const bodyParser = require("body-parser");
const Share = require("./link")
const crypto = require('crypto')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://anshul:maqOEfK6ZbvePCTF@cluster0-mygnl.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })

app.use(bodyParser.json());
app.use(require("cors")());

app.use(express.static(__dirname + "/frontend"))

app.post("/c", (req, res) => {
  const { code, input = "" } = req.body;
  let resultPromise = c.runSource(code, { stdin: `${input}\n` });
  resultPromise
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/cpp", (req, res) => {
  const { code, input = "" } = req.body;
  let resultPromise = cpp.runSource(code, { stdin: `${input}\n` });
  resultPromise
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/python", (req, res) => {
  const { code, input = "" } = req.body;
  let resultPromise = python.runSource(code, { stdin: `${input}\n` });
  resultPromise
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/node", (req, res) => {
  const { code, input = "" } = req.body;
  let resultPromise = node.runSource(code, { stdin: `${input}\n` });
  resultPromise
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});



app.post("/save", async (req, res) => {
  const { code, input = "", language = "c" } = req.body;
  let link = await (await Share.create({ code, language, shortId: crypto.randomBytes(8).toString("hex") })).save()
  res.json(link.toObject())
})

app.get("/share/:id", async (req, res) => {
  let data = await Share.findOne({ shortId: req.params.id })
  res.json(data.toObject())
})

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/frontend/index.html")
})

app.listen(process.env.PORT || 3000);
