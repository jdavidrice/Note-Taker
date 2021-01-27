const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT); 
});