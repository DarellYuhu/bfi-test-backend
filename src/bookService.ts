import express from "express";
import prisma from "../database";

const bookService = express.Router();

// create book
bookService.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = await prisma.book.create({
      data: { title, author },
    });
    return res.json({ message: "Book created successfully", data: book });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

// get many books
bookService.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    return res.json({ message: "Book retreived", data: books });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

// get by id
bookService.get("/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await prisma.book.findUnique({ where: { isbn } });
    return res.json({ message: "Book retreived", data: book });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

// update book data
bookService.patch("/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const { title, author } = req.body;
    const books = await prisma.book.update({
      where: { isbn },
      data: { title, author },
    });
    return res.json({ message: "Book updated successfully", data: books });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

// delete book data
bookService.delete("/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await prisma.book.delete({
      where: { isbn },
    });
    return res.json({ message: "Book deleted successfully", data: book });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

export default bookService;
