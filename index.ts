import express from "express";
import userRoute from "./src/userService";
import bodyParser from "body-parser";
import authService from "./src/authService";
import bookService from "./src/bookService";
import destinationService from "./src/destinationService";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.use("/auth", authService);
app.use("/book", bookService);
app.use("/destination", destinationService);

app.listen(3000, () => console.log("Server is running on port: 3000"));
