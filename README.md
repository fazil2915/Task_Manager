# Task Manager
This project is a RESTful API service for an e-commerce platform, built using Node.js, Express.js, and PostgreSQL. It provides a robust backend solution for managing sellers and buyers in the e-commerce platform.
## End Points
* /api/user/createTask/:id : Creates a new task for the specified user.
* /api/user/getAllTasks : Retrieves all tasks for the authenticated user.
* /api/user/getTask/:id : Fetches a specific task by its ID for the authenticated user.
* /api/user/updateTask/:id : Updates details of an existing task for the authenticated user.
* /api/user/deleteTask/:id : Deletes a specific task by ID for the authenticated user.

## Api Documentation
All complete details have covered in this link [Details](https://documenter.getpostman.com/view/25678286/2sAY4vgN4A).

## Technologies Used
> Frontend: React.js, Material-UI for a dynamic and user-friendly interface.
Backend: Node.js, Express.js for building RESTful APIs.
Database: MongoDB for efficient data storage and retrieval.
State Management: Redux for managing application state.
Deployment: Vercel for easy and reliable deployment.

## Deployment on Vercel
#### Prerequisites
* A Vercel account. If you don't have one, you can sign up here.
* You can install it globally using npm
`````````
npm install -g vercel
````````````

##### Deployment Steps
`````````
git clone [repo_url] (*main)
cd Task_Manager
vercel login
`````````
* Configure Environment Variables
* Deploy
