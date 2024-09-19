import express from "express";

const destinationService = express.Router();

destinationService.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const cPage = parseInt(page as string) || 1;
    const cLimit = parseInt(limit as string) || 10;
    const response = await fetch("https://freetestapi.com/api/v1/destinations");
    const data = await response.json();
    const pagedData = data.slice((cPage - 1) * cLimit, cPage * cLimit); // pagination
    // page 2
    // starting = 2 -1 * 10 = 10
    // enddata = 2 * 10 = 20
    [0, 1, 2,3 .... 10, ...... 20]
    return res.json({
      message: "success",
      data: pagedData,
      metadata: {
        page: cPage,
        limit: cLimit,
        next: cPage + 1,
        prev: cPage - 1,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

export default destinationService;
