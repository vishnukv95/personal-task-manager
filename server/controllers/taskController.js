import taskModel from "../models/taskModel.js"

export const getTasks = async (req, res) => {
try {
const tasks = await taskModel.find({ user: req.user._id });
if(!tasks)return res.status(404).json({error:"no tasks found"})
res.json(tasks);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const addTask = async (req, res) => {
try {
const { title, description, dueDate } = req.body;
const task = await taskModel.create({ user: req.user._id, title, description, dueDate });
res.status(201).json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const updateTask = async (req, res) => {
try {
const task = await taskModel.findOne({ _id: req.params.id, user: req.user._id });
if (!task) return res.status(404).json({ message: 'Task not found' });
const { title, description, completed, dueDate } = req.body;
task.title = title ?? task.title;
task.description = description ?? task.description;
if (completed !== undefined) task.completed = completed;
task.dueDate = dueDate ?? task.dueDate;
await task.save();
res.json(task);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


export const deleteTask = async (req, res) => {
try {
const task = await taskModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};