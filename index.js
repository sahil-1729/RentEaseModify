const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const app = express();
const connectDB=require('./config/database')
const AdminRouter=require('./routes/admin')
const AuthRouter=require('./routes/auth')
const CalendarRouter=require('./routes/calendar')
const PropertyRouter=require('./routes/property')
const UserRouter=require('./routes/user')
const propertyLCVRouter=require('./routes/propertyLCV')
//const http = require('http');
const path = require('path');
//const server = http.createServer(app);
//const { Message } = require('./database/database');
//const io = new Server(server);
const userSession=require("./session/userSession")
const port = process.env.PORT || 8800;
const cors = require('cors');
const corsOptions = {
  origin: process.env.FRONTENDURL, // Change this to the origin of your frontend application
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Pass cookies, if any
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(userSession)
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use('/admin',AdminRouter)
app.use('/auth',AuthRouter)
app.use('/calendar',CalendarRouter)
app.use('/properties',PropertyRouter)
app.use('/property',propertyLCVRouter)
app.use('/user',UserRouter)


//module.exports = server; // Export the HTTP server
