module.exports.setupRoutes = (app) => {
    const tasks = require("../controllers/taskController.js");
  
    // Create a new Task
    app.post("/", tasks.create);
  
    // Retrieve all Tasks
    app.get("/", tasks.findAll);
  
    // Retrieve all published Tasks
    //router.get("/published", tasks.findAllPublished);
  
    // Retrieve a single Tasks with id
    app.get("/api/task/:id", tasks.findOne);
  
    // Update a Tasks with id
    app.put("/:id", tasks.update);
  
    // Delete a Tasks with id
    app.delete("/:id", tasks.delete);
  
    // Delete all Tasks
    app.delete("/", tasks.deleteAll);
  };