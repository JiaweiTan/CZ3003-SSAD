const mongoose = require("mongoose");
const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_server = process.env.DB_HOSTNAME;
const db_conn = `mongodb+srv://${db_user}:${db_password}@${db_server}/backend`
var cors = require('cors');

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// imports routes for the events
var routes = require("./routes/routes");

// remove deprecated warnings for mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set('useFindAndModify', false);

console.log(db_conn)
mongoose
  .connect(db_conn)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.use(express.json());
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
