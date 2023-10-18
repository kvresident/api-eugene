require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const morgan = require('./middlewares/morgan.middleware.js')
const mongoose = require('mongoose')

const app = express();
app.set('trust proxy', true);

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())
app.use(cors({origin:'*'}))
app.use(fileUpload())
app.use(morgan)



const createMediaTable = require('./utils/mysql.createTables.js');
createMediaTable();



const {uri, port}= process.env;

app.get('/', (req, res)=>{
  res.json({success: 'connection was made successfully'})
})
app.use('/account', require('./routes/account.js'));
app.use('/post', require('./routes/posts.js'));
app.use('/house', require('./routes/houses.js'))


mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(result=>{
  app.listen(port, ()=>{
    console.log('app listening at http://127.0.0.1:'+port);
  })
}).catch(err=>{
  console.log(err)
})

app.use((req, res)=>{
  let ip = req.ip;
  res.status(404).json({error: 'resource not found', ip})
})