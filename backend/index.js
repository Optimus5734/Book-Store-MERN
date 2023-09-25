import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
//Middleware to parse request body in json
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome bhaiii");
});

//Route for Save a new Book
app.post("/books", async (request, response) => {
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
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get all books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route to get one book from database by the us of id
app.get("/book/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if(!book){
        return response.status(404).json({message:"Book not found"});
    }
    return response.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//To Update the neccessary stuff
app.put("/book/:id", async (request, response) => {
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
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id,request.body);
    if(!result){
        return response.status(404).json({message:"Book not found"});
    }
    return response.status(200).json({ message:"Hey we have updated your request buddy" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//to delete the require stuff
app.delete("/book/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return response.status(404).json({message:"Book not found"});
        }
        return response.status(200).json({ message:"Bingo the book is been deleted" });
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
