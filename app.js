
const express = require('express');

const path = require('path');

const cors = require('cors')

const sequelize = require('./util/database');

//const getControllerFor404 = require('./controllers/404page.js')

const parser = require('body-parser')

const app = express();

app.use(cors(
  {
    origin: '*'
  }
))

app.use(express.json())

const signuproutes = require('./routes/users')
const msgs = require("./routes/msg");
const grouproutes = require("./routes/groups")


//const loginroutes = require('./routes/login')
//const messageroutes = require('./routes/message')


const users = require('./models/user')
const messages = require('./models/messages')
const groups = require('./models/groups')
const usergroups = require('./models/usergroups')

app.use(parser.urlencoded({extended: false}))
app.use('/user',signuproutes)
app.use(msgs)
app.use(grouproutes)


//app.use(loginroutes);
//app.use(messageroutes);
//app.use(getControllerFor404.get404Page)

users.hasMany(messages)
messages.belongsTo(users)

groups.belongsToMany(users, {through: usergroups})
users.belongsToMany(groups,{through: usergroups})

groups.hasMany(messages)
messages.belongsTo(groups)


sequelize
  .sync()
  
  .then(() => {
   
   
   app.listen(9000)
  })
 
  .catch(err => {
    console.log(err);
  });


