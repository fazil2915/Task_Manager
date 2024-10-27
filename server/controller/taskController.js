import Task from '../Model/task.js';
import User from '../Model/user.js';

//create a new task
export const createTask=async(req,res)=>{
try {
    const {id}=req.params;
    const {title}=req.body;
    //check if the user exists
    const user=await User.findById(id);
    if(!user) return res.status(404).json({msg:"User not found"});
    //create a new task

    const newTask = new Task({
        title:title,
        taskOwner:id
    })
    const savedTask=await newTask.save();
    res.status(201).json(savedTask);
} catch (error) {
    res.status(500).json({err:error.message})
}
}

//get all tasks
export const getTasks=async(req,res)=>{
try {
    const tasks=await Task.find();
    if(!tasks) return res.status(404).json({msg:"No tasks found"});
     
    res.status(200).json(tasks);
} catch (error) {
    res.status(500).json({err:error.message})
}
}
//get a specific task
export const getSpecificTask=async(req,res)=>{
    try {
        const {id}=req.params;
        //get the task
        const task=await Task.findById(id).populate('taskOwner','userName');
        if(!task) return res.status(404).json({msg:"Task not found"});
        res.status(200).json(task);
    
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

//update the task
export const updateTask=async(req,res)=>{
    try {
        const {id}=req.params;
        const {title}=req.body;
        
        const task=await Task.findById(id);
        if(!task) return res.status(404).json({msg:"Task not found"});

        const updatedTask=await Task.findByIdAndUpdate(id,
            {title:title},
            {new:true}
        ).populate('taskOwner','userName');
         
        if(!updatedTask) return res.status(404).json({msg:"Task not updated"});
        
        res.status(200).json(updatedTask);
        
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}
//delete the task
export const deleteTask=async(req,res)=>{
try {
    const {id}=req.params;
    const task=await Task.findByIdAndDelete(id);
    if(!task) return res.status(404).json({msg:"Task not found"});

    res.status(200).json({msg:"Task deleted"});
} catch (error) {
    res.status(500).json({err:error.message})
}
}