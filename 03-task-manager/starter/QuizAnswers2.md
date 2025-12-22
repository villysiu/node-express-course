
1. In this lesson, you created a middleware function called asyncWrapper. Why?

  - to avoid repetitive code, 
  - and all error go to error handling middleware.

2. Suppose that you want to make sure that both a status code and an error message are sent back to the user when they request the URL for a task that does not exist. Assume that you’ve created a CustomAPIError class and an error handler that references that class. Complete the code:
```javascript
const getTask = asyncWrapper(async (req, res, next) => {  
  const { id: taskID } = req.params;  
  const task = await Task.findOne({ _id: taskID });  
  if (!task) {  

    // your code here  
    return next(new CustomAPIError(`No task with id: ${taskID}`, 404));
    
    }
  }  
  res.status(200).json({ task });  
});  
```