const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

//--------------HTTP-GET-------------------------

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("person does not exist");
  }
});

app.get("/info", (req, res) => {
  const infoPage = `<div><p>Phonebook has info for ${
    persons.length
  } people</p><p>${new Date()}</div>`;
  res.send(infoPage);
});

//--------------HTTP-DELETE-------------------------

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(persons);
  res.status(204).end();
});

//--------------HTTP-POST-------------------------

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ error: "add a name to the post request" });
  }
  if (!body.number) {
    return res.status(400).json({ error: "add a number to the post request" });
  }
  if (persons.find((p) => p.name === body.name)) {
    return res.status(409).json({
      error: "name duplicated, please change your name hehe",
    });
  }
  const person = {
    id: Math.random() * 10000,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
