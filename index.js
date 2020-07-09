require('dotenv').config();
let express = require('express')()
var mongoose = require('mongoose')
var port = process.env.PORT || 8081;
var bp = require('body-parser')
var cors = require('cors')

//routes
let itemRoutes = require('./routes/items')
let adminRoutes = require('./routes/admin')
let authRoutes = require('./routes/auth')
let userRoutes = require('./routes/user')

express.use(
     bp.urlencoded({
       extended: true
     })
 );
 
express.use(cors({ origin: '*' }));
 
express.use(bp.json());

express.get('/', (req, res) => res.send('Hello World with Express'));
express.use('/items', itemRoutes)
express.use('/user', userRoutes)
express.use('/admin', adminRoutes)
express.use('/auth', authRoutes)

async function start(){
     try{
         await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017,localhost:27018,localhost:27019/grails?replicaSet=rs', {
             useNewUrlParser: true,
             useUnifiedTopology: true
         })
 
         express.listen(port, function(){
             console.log(`listening on *:${port}`);
         })
     }catch(err){
         console.log(err)
         return err
     }
 }
 start()
