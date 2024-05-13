import Task from '../models/task.model.js'

export const getTasks = async (req, res) => { 
  try {
    const tasks = await Task.find({$and: [{ user: req.user.id }, { deleted: false }]}).populate("user", ['userName', 'userEmail', 'createdAt']);
    if (!tasks.length) return res.status(200).json({ status: "success", tasks: [], message: "No task found." });
    return res.status(200).json({ status: "success", count: tasks.length, tasks });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "error",
        message: "Something wrong with the task process.",
      });
  }
}
export const getTask = async (req, res) => { 
  try {
    // const taskFound = await Task.findById(req.params.id).populate("user", ['userName', 'userEmail']);
    const taskFound = await Task.find({
      $and: [{ user: req.user.id }, { _id: req.params.id }],
    }).populate("user", ["userName", "userEmail"]);
    if (!taskFound.length) {
      return res.status(404).json({ status: "error", message: `The task with the id ${req.params.id} not found.` });
    }
    return res.status(200).json({ status: "success", task: taskFound })
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Something wrong with the task process." });
  }
}

export const createTask = async (req, res) => { 
  try {
    const { taskTitle, taskDescription, taskDate } = req.body;
    const newTask = new Task({ taskTitle, taskDescription, taskDate, user: req.user.id });

    const taskCreated = await newTask.save();
    return res.status(201).json({ status: "success", data: taskCreated });
  } catch (err) {
    console.log("error server side", err.message);
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskFound = await Task.find({
      $and: [{ user: req.user.id }, { _id: req.params.id }],
    });

    if (!taskFound.length) { 
      return res
        .status(404)
        .json({ status: "error", message: `Task not found by ${req.params.id}` });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user", ["userName", "userEmail", "createdAt"]);
    if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
    res.status(201).json({ status: "sucess", task });
  } catch (error) {
    return res.status(500).json({ status: 'error', error });
  }
}

export const deleteTask = async (req, res) => {
  // const task = await Task.findByIdAndDelete(req.params.id);
  try {
  const task = await Task.find({
    $and: [{ user: req.user.id }, { _id: req.params.id }],
  });
  if (!task) return res.status(404).json({ status: "error", message: "Task not found" });
    const taskUpdated = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    res.status(204).json({ status: "sucess", kmessage: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ status: "error", error });
  }
}
