import {Router} from 'express';
const router = Router();
import { createTask,getSpecificTask,getTasks,updateTask,deleteTask } from '../controller/taskController.js';
import { verifyToken } from '../middleware/auth.js';


router.post('/createTask/:id',verifyToken,createTask)
router.get('/getAllTasks',verifyToken,getTasks)
router.get('/getTask/:id',verifyToken,getSpecificTask)
router.put('/updateTask/:id',verifyToken,updateTask)
router.delete('/deleteTask/:id',verifyToken,deleteTask)
export default router;