const express = require("express");

const app = express();

app.use(express.json());

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
  const person = {
    id: Math.random() * 10000,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  console.log(persons);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT);
