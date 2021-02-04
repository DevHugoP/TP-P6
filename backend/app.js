const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const path = require("path");

mongoose
	.connect(
		"mongodb+srv://karmelit:polchetti59@cluster0.ddryw.mongodb.net/?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => console.log("La connexion à MongoDB à réussie !"))
	.catch(() => console.log("La connexion à MongoDB à échouée !"));

const app = express();

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
