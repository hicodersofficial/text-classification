import express from "express";
import { pipeline } from "@huggingface/transformers";
const app = express();
console.log("Loading Model...");
const pipe = await pipeline("sentiment-analysis");
console.log("Done loading Model");

app.get("/", async (req, res, next) => {
  try {
    const { query } = req.query;
    const out = await pipe(query);

    console.log(out);
    res.json(out[0]);
  } catch (error) {
    next(error);
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
