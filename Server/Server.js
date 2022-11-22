const express = require("express");
const app = express();
const port = 8080;
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const passport = require("passport");
var session = require("express-session");
const Auth = require("./Auth");
const { getUserData, getRecoveryData, getTodaysRecoveryData } = require("./Queries/UserInfo");
const { sessionobject } = require("./session");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const cors = require("cors");
const {
  getUserEverydays,
  addNewEveryday,
  markAsComplete,
} = require("./Queries/everydays");
const {
  getUserTodos,
  addTodoItem,
  markTodoAsComplete,
  removeTodo,
} = require("./Queries/todolist");
const {
  addTomorrowTodoItem,
  getTomorrowUserTodos,
  removeTomorrowTodoItem,
} = require("./Queries/tomorrowtodolist");
const { getUserJournal, insertUserJournal, updateUserJournal } = require("./Queries/dailyjournal");

app.set("trust proxy", 1);
app.use(session(sessionobject));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

app.use(passport.initialize());
app.use(passport.session());

const whoopAuthorizationStrategy = Auth.CreateAuthStrategy();
whoopAuthorizationStrategy.userProfile = Auth.fetchProfile;

passport.use("withWhoop", whoopAuthorizationStrategy);

app.get("/authenticatewithwhoop", passport.authenticate("withWhoop"));

app.get(
  "/authenticatewithwhoop/callback",
  passport.authenticate("withWhoop", {
    failureRedirect: "/whoopauthenticationfailure",
    failureMessage: true,
  }),
  function (req, res) {
    Auth.isuserauthenticated = true;
    res.send("Please close this tab now, Thank you");
  }
);

app.post("/authenticateuser", async (req, res) => {
  const authres = await Auth.UserAuthFlow(req.body.username, req.body.password);
  res.status(200).json(authres);
});

app.post("/validaterefreshtoken", async (req, res) => {
  try {
    const validationdata = await Auth.refreshWhoopTokens(req.body.refreshtoken);
    res.status(200).json({ newtoken: validationdata.refresh_token });
  } catch (err) {
    res.status(500).json({ message: "token not valid" });
  }
});

app.get("/geteverydays/userid/:userid", async (req, res) => {
  try {
    const everydaysdata = await getUserEverydays(req.params.userid);
    res.status(200).json(everydaysdata);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/gettodos/userid/:userid", async (req, res) => {
  try {
    const todos = await getUserTodos(req.params.userid);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500);
  }
});

app.post("/addnewtodo", async (req, res) => {
  try {
    const todos = await addTodoItem(req.body.userid, req.body.stitle);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500);
  }
});

app.post("/marktodoascomplete", async (req, res) => {
  try {
    const response = await markTodoAsComplete(req.body.userid, req.body.hmy);
    res.status(200).json(response);
  } catch (err) {}
});

app.post("/removetodoitem", async (req, res) => {
  try {
    const response = await removeTodo(req.body.userid, req.body.hmy)
    res.status(200).json(response)
  } catch (err) {
    res.status(500)
  }
})

app.post("/addtomorrowtodo", async (req, res) => {
  try {
    const response = await addTomorrowTodoItem(
      req.body.userid,
      req.body.stitle
    );
    console.log(response)
    res.status(200).json(response);
  } catch (err) {
    res.status(500);
  }
});

app.get("/gettomorrowtodos/userid/:userid", async (req, res) => {
  try {
    const response = await getTomorrowUserTodos(req.params.userid);
    res.status(200).json(response)
  } catch (err) {
    res.status(500);
  }
});

app.post("/removetomorrowtodo", async(req, res) => {
  try {
    const response = await removeTomorrowTodoItem(req.body.userid, req.body.hmy)
    res.status(200).json(response)
  } catch (err) {
    res.status(500)
  }
})

app.post("/markeverydayascomplete", async (req, res) => {
  try {
    await markAsComplete(req.body.hmy);
    const everydaysdata = await getUserEverydays(req.body.userid);
    res.status(200).json(everydaysdata);
  } catch (err) {
    res.status(500);
  }
});

app.get(
  "/addNewEveryday/userid/:userid/sname/:sname/dtend/:dtend",
  async (req, res) => {
    try {
      const everydaysdata = await addNewEveryday(
        req.params.userid,
        req.params.sname,
        req.params.dtend
      );
      res.status(200).json(everydaysdata);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
);

app.get("/getjournalentry/userid/:userid/daysprior/:daysprior", async (req, res) => {
  try {
    const response = await getUserJournal(req.params.userid, req.params.daysprior)
    res.status(200).json(response)
  } catch (err) {
    res.status(500)
  }
})

app.post("/insertdailyentry", async (req, res) => {
  try {
    const response = await insertUserJournal(req.body)
    res.status(200)
  } catch (err) {
    res.status(500)
  }
})

app.post("/updatedailyentry", async (req, res) => {
  try {
    const response = await updateUserJournal(req.body)
    res.status(200)
  } catch (err) {
    res.status(500)
  }
})

app.get('/gettodayswhoopdata/userid/:userid', async (req, res) => {
  try {
    console.log(
      'userid from server function: ', req.params.userid
    )
    const resdata = await getTodaysRecoveryData(req.params.userid)
    res.status(200).json(resdata)
  } catch (err) {
    res.status(500)
  }
})

app.get("/", async (req, res) => {
  Auth.isuserauthenticated = true;
  res.send("Okay");
});

app.get("/whoopauthenticationfailure", async (req, res) => {
  res.send("Whoop Authentication Failed");
});

app.get("/isuserauthenticated", (req, res) => {
  res.send(JSON.stringify({ Authenticated: Auth.isuserauthenticated }));
});

app.listen(port, () => {
  console.log("App listening on port " + port.toString());
});
