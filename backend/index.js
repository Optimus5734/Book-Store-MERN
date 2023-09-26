import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import  booksRoute  from "./routes/booksRoute.js";


const app = express();

//Middleware to parse request body in json
app.use(express.json());

//Middleware for handling CORS policy
//option-1 Allow all origins with default of cors(*)
//app.use(cors(*));
//option-2 Allow custom Origins
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}))


app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome bhaiii");
});

// any incoming requests that start with /books will be handled by the booksRoute router.
app.use('/books',booksRoute);

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
