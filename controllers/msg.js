const express = require('express')
const messagetable = require('../models/messages')
const { Sequelize, Op } = require("sequelize");
const uploadfile = require('../models/fileUpload')




exports.sendmsg = async (req, res, next) => {
   try{
   
    const message = req.body.message;
    console.log("messagessssssssssssssssssssssssssssssssss", message)
    const username = req.user.name;
    const groupid = req.body.groupid;

    if(!groupid)
    {
        req.user.createMessage({message: message, Username: username}).then(() =>{
            res.sendStatus(200)
        })
    }
    else
    {
        req.user.createMessage({message: message, Username: username, GroupId:groupid}).then(() =>{
            res.sendStatus(200)
        })
    }
}
catch(err){
console.log(err)
res.status(500).json({Error: err})
}
}

exports.getmessages = async (req, res) => {
    try{
    const id=req.query.id
    console.log("Idddddddddddddddd", id)
   messagetable
      .findAll({where:{msgid:{[Op.gt]:id}, GroupId:null}})
      .then((msgs) => {
        res.json(msgs);
      })
      .catch((err) => console.log(err));
    }
    catch(err)
    {
    console.log("Error:", err);
    res.status(500).json({Error: err})
    }
  };

  exports.getallmessages = async(req, res) =>{
    try{
    messagetable
      .findAll().then((msgs) =>{
        res.json({allmessages: msgs})
      })
      .catch(err => console.log(err))
    }
    catch(err)
    {
        console.log("Error:", err);
        res.status(500).json({Error: err})
    }
  }

  
exports.getgroupmessages=async function(req,res){
    try{
    const groupid=req.query.gid
  
    messagetable
      .findAll({where:{GroupId:groupid}})
      .then((msgs) => {
        res.json(msgs);
      })
      .catch((err) => console.log(err));
    }
    catch(err)
    {
        console.log("Error:", err);
        res.status(500).json({Error: err})
    }
  
  
  }


  exports.getfiles=async function(req,res){
    try{
    const groupid=req.query.gid
  
    uploadfile
      .findAll({where:{GroupId:groupid}})
      .then((msgs) => {
        res.json(msgs);
      })
      .catch((err) => console.log(err));
    }
    catch(err)
    {
        console.log("Error:", err);
        res.status(500).json({Error: err})
    }
  }
  /*
  exports.file = async function(req, res, next){
console.log("fileeeeeeeeeeeeeeeeeeeeee",req.body)

  } 
  */
exports.filecontents = async(req, res, next) =>{

try{
  uploadfile.findAll({where:{GroupId:null}}).then((response) =>{
    res.json({success:true, result:response})
  })


}
catch(err)
{
  console.log(err)
  res.status(500).json({success:false, error:err})
}

}