const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')


const app = express();
dotenv.config();
const port = process.env.PORT || 8080;


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log("Connection Successful"))
.catch( (err) => console.log(err));
mongoose.set('useFindAndModify', false);

const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/group');

app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(expressValidator());
app.use('/', authRoutes);
app.use('/', groupRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})