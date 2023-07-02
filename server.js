const express = require("express");
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require('./configs/db.config');
const userModel = require('./models/user.model');

const app = express();

//* Logic to connect the mongoDB and create an admin user
//* need to have mongoDB up and running in your local machine

mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection;

db.on("error",()=>{
    console.log("Error");
})

db.once("open",()=>{
    console.log("DB is connected");

    init();
});

async function init() {

    //* Check if the admin user is already present

    let admin = await userModel.findOne({
        userId : "admin"
    });

    if (admin) {
        console.log("Admin user is already present");
        return;
    }

    //* Initialize the mongoDB 
    //* Need to create admin user

    admin = await userModel.create({
        name : "Shiva Singh",
        userId : "admin",
        email : "shivasingh@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)  // 8 is salt
    });
    console.log(admin);
}


app.listen(serverConfig.PORT, () => {
    console.log(`Server stsrted on the port no ${serverConfig.PORT}`);
});