const mongoose = require("mongoose");
const express = require("express");
const app = express();

// imports routes for the events
var routes = require("./routes/routes");

// remove deprecated warnings for mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect("mongodb://localhost/backend")
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.use(express.json());
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
