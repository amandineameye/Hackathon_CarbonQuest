const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
	.connect(
		"mongodb+srv://admin:7JMTKQaBqrm5QO09@cluster0.fzoze.mongodb.net/carbonQuestDB"
	)
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.log("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	score: {
		type: [Number],
		required: false,
	},
});

const User = mongoose.model("User", userSchema);

const newUser = new User({
	username: "Amandine",
	password: "bestPassword21",
});

newUser.save().then(() => console.log("User saved!"));

app.listen("3001", () => {
	console.log("Server is running and listening on port 3001");
});

app.get("/", (req, res) => {
	res.send("Server is running and MongoDB is connected!");
});
