const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8000 || process.env.PORT;
const cors = require('cors');

app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const databaseConnection= async ()=> {
    
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/loanapp', { useNewUrlParser: true });
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Database connection failed: ", err);
    }
    
    // Handle err after connection
    mongoose.connection.on('error', err => {
        logError(err);
        console.log("Error in mongoose connection");
    });
    
    // Handle 'disconnected' event
    mongoose.connection.on('disconnected', () => {
        logDisconnectedEvent();
        console.log('Mongoose connection to MongoDB was disconnected');
    });
}
databaseConnection();

const initRoutes=require('./Routes/routes');
initRoutes(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});