const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("database.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Users endpoint
server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const users = router.db.get('users');
  const user = users.find({ id: parseInt(id) }).value();

  if (!user) {
    return res.status(404).json({ status: "FAIL", error: "User not found" });;
  }

  user.name = name || user.name;
  user.email = email || user.email;

  router.db.write();

  // Return updated user
  res.json({ status: "SUCCESS", message: "User updated successfully", user: user });
});

// User registration endpoint
server.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const users = router.db.get("users").value();
  console.log(router.db.get("users").value().length);

  const userExists = users.some((user) => user.email === email);
  console.log("check reg");
  if (userExists) {
    res.status(400).json({ message: "email already taken" });
  } else {
    let id = router.db.get("users").value().length + 1;
    const newUser = { id, name, email, password };
    router.db.get("users").push(newUser).write();
    res.status(201).json({ message: "User registered successfully" });
  }
});

// User login endpoint
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const authenticatedUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!authenticatedUser) {
    res.status(401).json({ message: "Failed" });
  } else {
    console.log(authenticatedUser);
    res.status(200).json({ user: authenticatedUser, message: "Success" });
  }
});

// task endpoint

server.get("/tasks?userId=:userId", (req, res) => {
  console.log(req.user);
  const currentUser = req.user;
  const tasks = router.db
    .get("tasks")
    .filter({ userId: currentUser.id })
    .value();
  console.log(tasks);
  res.json(tasks);
});

server.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = router.db.get("tasks").find({ id: id }).value();

  if (tasks) {
    res.status(200).json(tasks);
  } else {
    res.status(404).json({ message: "tasks not found" });
  }
});

server.put("/tasks/:id", (req, res) => {
  const tasks = router.db.get("tasks").find({ id: parseInt(req.params.id) });
  if (tasks.value()) {
    tasks.assign(req.body).write();
    res.status(200).json({ message: "Task updated successfully" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

server.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tasks = router.db.get("tasks").value();
  const index = tasks.findIndex((data) => data.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    router.db.write();

    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

server.post("/tasks", (req, res) => {
  const userId = req.body["userId"];
  const currentUser = router.db.get("users").find({ id: userId }).value();

  if (!currentUser) {
    return res.status(401).json({ message: "User not found" });
  }

  const { name, date, description, status } = req.body;
  let id = router.db.get("tasks").value().length + 1;
  const newTask = {
    id,
    userId: currentUser.id,
    name,
    date,
    description,
    status,
  };

  router.db.get("tasks").push(newTask).write();
  res.status(200).json({ message: "Task created", task: newTask });
});

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
