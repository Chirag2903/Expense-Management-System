const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
const user = require("../backend/routes/userroutes");
app.use(user);

const connectdatabase = () => {
    mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true,
    }).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};
connectdatabase();



app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
