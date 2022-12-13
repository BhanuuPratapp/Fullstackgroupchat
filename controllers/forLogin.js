const fs= require('fs')
const path = require('path');
const rootDir = require('../util/path')
exports.getLogin = (req,res,next)=>{
 
   res.sendFile(path.join(rootDir,'views','login.html'))
   // res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input id="username" type="text" name="title"><button type="submit">add</button></form>')
  
}

exports.postLogin= (req,res,next)=>{
    
    console.log(req.body.title);
    res.redirect('/');
    
    }
    exports.getChats= (req,res,next)=>{
        fs.readFile("message1.txt", (err, data) => {
            if(err){
                console.log(err)
                data = 'no chat'
            } 
          //  res.send(`${data}<form action="/" onsubmit="document.getElementById('username1').value=localStorage.getItem('username')" method = "POST"><input type ="text" id="username"name ="message"><input type="hidden" id="username1"name="username" placeHolder="message"><button type ="submit">Send</button>`)
          res.sendFile(path.join(rootDir,'views','chats.html'))  
          })
    }
    
    exports.postChats = (req, res, next) =>{
        fs.writeFile("message1.txt", `${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
            err? console.log(err): res.redirect('/') 
          
        })
    }
