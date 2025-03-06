const express = require("express");
const connectDb = require("./src/configs/db");
require("dotenv").config();
const cors = require("cors");
const recipeRoute = require("./src/routes/recipe.routes");

const app = express();
const PORT = process.env.PORT || 8090
const DB_URL = process.env.DB_URL

app.use(cors());
app.use(express.json());

app.use('/api/recipe', recipeRoute);

app.get('/', (req, res) => {
    res.send("This is a home route...");
})



app.listen(PORT, () => {
    connectDb(DB_URL);
    console.log(`Sever is runing at http://localhost:${PORT}`);
});