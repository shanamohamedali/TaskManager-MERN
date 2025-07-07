const express = require("express");
const cors = require("cors");
const app = express();
const todoRouter=require("./routes/todoRoute")
require('dotenv').config()
const connectDb=require("./config/db")

app.use(cors());
app.use(express.json());
connectDb();
app.use("/api/todo-app",todoRouter)


const PORT= process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
