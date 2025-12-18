const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    // res.send(req.body);
    const tasks = await Task.find();
    // Task.find({}); // find all with no filter
    
    res.status(200).json({ tasks });
}

const createTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
}
const getTask = async (req, res) => {
    // res.json({id: req.params.id});

    // Task.find({ completed: true });
    // Task.find({ name: 'shakeAndBake' });
    const id = req.params.id;
    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({
            message: `No task with id: ${id}`
        });
    }

    res.status(200).json({ task });
}
const updateTask = async (req, res) => {
    // res.json({id: req.params.id})
    const id = req.params.id;

    // const task = await Task.findById(id);
    // const {name, completed} = req.body;
    // if(name)
    //    task.name = req.body.name;
    // if(completed)
    //    task.completed = completed;
    // await task.save();

    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!task) {
        return res.status(404).json({
            message: `No task with id: ${id}`
        });
    }

    res.status(200).json({ task });
}
const deleteTask = async (req, res) => {
    // res.json({id: req.params.id});
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if(!task)
        return res.status(404).json({
            message: `No task with id: ${id}`
        });
    
    res.status(200).json({
        message: `Task ${id} deleted`
    }

    )
}
module.exports =  {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}