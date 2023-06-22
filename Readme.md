The first method is to define an the structure of the first things that is an task.

1. Create a error handler, it will be called after every error in try catch bloks

2. Add the validation

//Tasks

1. I am adding the email verification
   1. First update the user model with the verification status(boolean)
   2. Update create user controller with verification status
   3. Add the email to the verification email sender.
   4. Create an another controller to user to verify email
   5. Add another controller to get the validation email again

//Notes

1. Use
   return next(err) with synchornous code and
   next(err) with asynchornous

2. Add a message with every error., inside the try and catch blocks.

3. Types of error i am encounter

   1. User not Found: For such cases i will redirect my user to login page.
   2. Server Error: At such case i need to log server error and furthr information to my admin
   3. Element not found: In these user elments as task and taks list are not founf, requires furthur research.
   4. Not logged in

4. test about the use of

   1. return next(error); or
   2. next (error);

5. Add the functionality of pulling the task out of the parent task list.

6. Add authentication

7. Tasks
   1. I am adding a new database for priority of tasks
