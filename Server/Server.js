const express = require("express");
const app = express();
const port = 8080;
var session = require("express-session");
const { sessionobject } = require("./session");
const cors = require("cors");
const auth = require('./Routes/auth');
const everydays = require('./Routes/everydays')
const todos = require('./Routes/todos')
const dailyentry = require('./Routes/dailyentry')
const whoop = require('./Routes/whoop')
const goals = require('./Routes/goals')

app.set("trust proxy", 1);
app.use(session(sessionobject));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use('/auth', auth)
app.use("/everydays", everydays)
app.use("/todos", todos)
app.use('/dailyentry', dailyentry)
app.use('/whoop', whoop)
app.use('/goals', goals)

app.get("/", async (req, res) => {
  res.send("Okay");
});

app.listen(port, () => {
  console.log("App listening on port " + port.toString());
});
