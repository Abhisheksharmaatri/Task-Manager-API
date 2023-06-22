Task Manager API

This is a Node.js and Express project called "Task Manager API" that provides a set of routes for managing tasks, task lists, and user authentication. The API is designed to allow users to create, update, delete, and retrieve tasks, task lists, and user information. The routes are protected with authentication middleware to ensure secure access.
Routes

1. Task Routes
   1. POST /task/create
      Creates a new task.
      Requires authentication.
      Endpoint tested and functional.
   2. POST /task/update
      Updates an existing task.
      Requires authentication.
      Endpoint tested and functional.
   3. POST /task/delete
      Deletes a task.
      Requires authentication.
      Endpoint tested and functional.
   4. POST /task/get
      Retrieves a task.
      Requires authentication.
      Endpoint tested and functional.
   5. POST /task/get-all
      Retrieves all tasks.
      Requires authentication.
      Endpoint tested and functional.
   6. POST /task/add-priority
      Adds priority to a task.
      Requires authentication.
      Endpoint tested and functional.
   7. POST /task/remove-priority
      Removes priority from a task.
      Requires authentication.
      Endpoint tested and functional.
   8. POST /task/get-priority
      Retrieves priority tasks.
      Requires authentication.
      Endpoint tested and functional.
   9. POST /task/complete
      Marks a task as completed.
      Requires authentication.
      Endpoint tested and functional.
   10. POST /task/uncomplete
       Marks a task as uncompleted.
       Requires authentication.
       Endpoint tested and functional.
   11. POST /task/get-uncompleted
       Retrieves uncompleted tasks.
       Requires authentication.
       Endpoint tested and functional.
   12. POST /task/get-completed
       Retrieves completed tasks.
       Requires authentication.
       Endpoint tested and functional.
2. Task List Routes
   1. POST /task-list/create
      Creates a new task list.
      Endpoint tested and functional.
   2. POST /task-list/update
      Updates an existing task list.
      Endpoint tested and functional.
   3. POST /task-list/delete
      Deletes a task list.
      Endpoint tested and functional.
   4. POST /task-list/add-collaborator
      Adds a collaborator to a task list.
      Endpoint tested and functional.
   5. POST /task-list/remove-collaborator
      Removes a collaborator from a task list.
      Endpoint tested and functional.
   6. POST /task-list/add-task
      Adds a task to a task list.
      Endpoint tested and functional.
   7. POST /task-list/remove-task
      Removes a task from a task list.
      Endpoint tested and functional.
3. User Routes
   1. POST /user/create
      Creates a new user.
      Endpoint tested and functional.
   2. POST /user/update
      Updates user information.
      Endpoint tested and functional.
   3. POST /user/delete
      Deletes a user.
      Endpoint tested and functional.
   4. POST /user/login
      Authenticates a user and generates a session token.
      Endpoint tested and functional.
   5. POST /user/logout
      Logs out a user by invalidating the session token.
      Endpoint tested and functional.
   6. POST /user/get-user
      Retrieves user information.
      Endpoint tested and functional.
