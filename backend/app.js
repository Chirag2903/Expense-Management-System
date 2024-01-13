const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}




app.use(cookieParser());
app.use(express.json());
const user = require("../backend/routes/userroutes");
app.use(user);

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

const connectdatabase = () => {
    mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};
connectdatabase();



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
