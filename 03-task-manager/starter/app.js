require('dotenv').config();
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');

//middleware
app.use(express.json());

// routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App');
})

app.use('/api/v1/tasks', tasks);
// app.get('/app/v1/tasks') - get all tasks
// app.post('/app/v1/tasks') - create new tasks
// app.get('/app/v1/tasks/:id') - get single task
// app.patch('/app/v1/tasks/:id') - update tasks
// app.delter('/app/v1/tasks/:id') - delete tasks
const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }catch (error) {
        console.log(error);
    }
}
start();


