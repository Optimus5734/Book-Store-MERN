import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome bhaiii");
});

//Route for Save a new Book
app.post("/book", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: "Send all the needed field" });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to data base");
    app.listen(PORT, () => {
      console.log(`App is live buddy ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Uff we ran into an error");
    console.log(error);
  });
