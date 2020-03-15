const app = require("express")();
const { c } = require("compile-run");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(require("cors")());

app.post("/", (req, res) => {
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

app.listen(3000);
