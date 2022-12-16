require('dotenv').config();

const express = require('express');

const path = require('path');

const uuid = require('uuid').v4

const cors = require('cors')

const sequelize = require('./util/database');

const parser = require('body-parser')

const multer = require('multer')

const {s3Uploadv2} = require("./s3Service")



const userauthentication = require('./middleware/auth')

const app = express();



app.use(cors(
  {
    origin: '*'
  }
))

app.use(express.json())


/*
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "uploads")
  },
  filename:(req, file, cb) => {
    const { originalname} = file;
    cb(null, `${uuid()}-${originalname}`);
  }
})
*/


const storage = multer.memoryStorage();

const upload = multer({storage, limits:{fileSize: 100000000, files: 2}})

app.post("/sharefiles",userauthentication.authenticate,upload.array("file"),async (req, res) =>{
  try{

   
    console.log(req.files)
  const results = await s3Uploadv2(req.files);
  console.log("resultssssssssss",results)
  for(let i=0;i<results.length;i++)
  {
    //console.log("results[i][][][][][o][]o[o]o[][o]", results[i].key.split("-")[results[i].key.split("-").length -1])
let groupId = req.header('groupId')
    if(groupId)
     req.user.createFileupload({url: results[i].Location,name: req.user.name,GroupId:groupId, filename:results[i].key.split("-")[results[i].key.split("-").length -1] })
    // fileuploads.create({url: results[i].Location, forsignupId: req.user.id, name: req.user.name, filename:results[i].key.split("-")[results[i].key.split("-").length -1] })
    if(!groupId)
    {
      req.user.createFileupload({url: results[i].Location,name: req.user.name,filename:results[i].key.split("-")[results[i].key.split("-").length -1] })

    }
  }

  return res.json({status: "successss"})
  }
  catch(err)
  {
    console.log(err);
  }
})

app.use((error, req, res, next) => {
  if(error instanceof multer.MulterError)
  {
    if(error.code === "LIMIT_FILE_SIZE"){
      return res.status(400).json({
        message: "File is too large"
      })
    }
    if(error.code === "LIMIT_FILE_COUNT"){
      return res.status(400).json({
        message: "File is too big"
      })
    }
  }
})




const signuproutes = require('./routes/users')
const msgs = require("./routes/msg");
const grouproutes = require("./routes/groups")


const users = require('./models/user')
const messages = require('./models/messages')
const groups = require('./models/groups')
const usergroups = require('./models/usergroups');
const fileuploads = require("./models/fileUpload")


app.use(parser.urlencoded({extended: false}))
app.use('/user',signuproutes)
app.use(msgs)
app.use(grouproutes)





users.hasMany(messages)
messages.belongsTo(users)

groups.belongsToMany(users, {through: usergroups})
users.belongsToMany(groups,{through: usergroups})

groups.hasMany(messages)
messages.belongsTo(groups)

users.hasMany(fileuploads)
fileuploads.belongsTo(users)

groups.hasMany(fileuploads)
fileuploads.belongsTo(groups)


sequelize
  .sync()
  
  .then(() => {
   
   
   app.listen(9000)
  })
 
  .catch(err => {
    console.log(err);
  });


