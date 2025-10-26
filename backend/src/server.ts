import express from "express";
import { sequelize } from "./database/sequelize";
import User from "./database/models/user.model";

const app = express();
app.use(express.json());

app.get("/", async (_, res) => {
    const users = await User.findAll();
    res.json(users);
});

sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected");
    app.listen(4000, () => console.log("Server running on 4000"));
});
